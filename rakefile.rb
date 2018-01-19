require 'rake'

NODE_PATH="./node_modules"
NODE_BIN_PATH="#{NODE_PATH}/.bin"
ADB="$ANDROID_HOME/platform-tools/adb"
REACT_NATIVE_CMD="node #{NODE_PATH}/react-native/local-cli/cli.js"
IOS_PLIST="./ios/minimal/Info.plist"
PACKAGE="./package.json"
GRADLE_PROPERTIES="android/gradle.properties"

def localExec(cmd)
  head, *tail = cmd.split(' ')
  localFile = "#{NODE_BIN_PATH}/#{head}"
  if File.exists? localFile
    head = localFile
  end
  puts "executing (#{localFile})"
  sh "#{head} #{tail.join(' ')}"
end
desc 'react-native start'
task :start do
  sh "#{REACT_NATIVE_CMD} start"
end
desc 'exec tests'
task :test do
  localExec "jest"
end
task :cleanReactCache do
  sh "rm -rf $TMPDIR/react-*"
end
task :cleanWatchman do
  sh "watchman watch-del-all"
end
task :clean => [:cleanReactCache, :cleanWatchman, "android:clean", "ios:clean"] do
  sh "npm cache clean --force"
end
desc 'clean cache, node_modules, watchman, reinstall packages'
task :newclear => [:cleanReactCache, :cleanWatchman] do
  sh "rm -rf ios/build && rm -rf #{NODE_PATH} && npm cache clean --force"
  sh "yarn install"
end
desc 'burn down every cached resource and reinstall (may take some time)'
task :burn => [:cleanWatchman] do
  sh "rm -rf #{NODE_PATH}"
  sh "rm -fr $TMPDIR/react-native-packager-cache-*"
  yarn_cache_dir = `yarn cache dir`
  sh "rm -rf #{yarn_cache_dir}"
  sh "yarn install"
end

namespace :android do
  desc 'gradle clean android'
  task :clean do
    cd 'android' do
      sh "./gradlew clean"
    end
  end
  desc 'create bundle'
  task :bundle do
    sh "#{REACT_NATIVE_CMD} bundle --transformer #{NODE_PATH}/react-native-typescript-transformer/index.js --platform android --entry-file index.android.js --dev false --bundle-output ./CodePush/index.android.bundle --assets-dest ./CodePush --sourcemap-output ./CodePush/sourcemap.js"
    # sh "react-native bundle --platform android --entry-file index.android.js --dev false --bundle-output ./android/main.jsbundle --assets-dest ./android --sourcemap-output ./sourcemap.js"
  end

  desc 'create tar ball from release-apk'
  task :tar do
    version = get_current_version()
    sh "tar cfvz minimalapp#{version}.tar.gz ./android/app/build/outputs/apk/app-release.apk"
  end

  desc 'view keystore content'
  task :keystore do
    sh "keytool -v -list -keystore android/app/minimal.keystore"
  end
  desc 'assembleRelease for android (build release apk)'
  task :build do
    cd 'android' do
      sh "./gradlew assembleRelease"
    end
  end
  desc 'build & install android release apk'
  task :install => "android:build" do
    cd 'android' do
      sh "./gradlew installRelease"
    end
  end

  desc 'adb uninstall minimal app'
  task :uninstall do
    begin
      sh "#{ADB} uninstall com.esrlabs.xyz"
    rescue Exception => e
      puts "could not uninstall (probably not here anymore)(#{e})"
    end
  end

  desc 'clean and reinstall android app'
  task :cleaninstall => ["android:uninstall", "android:clean", "android:install"]

  desc 'reinstall android app'
  task :reinstall => ["android:uninstall", "android:install"]

  desc 'run but remove first'
  task :runfresh => ["android:uninstall", "android:clean", "android:run"]

  task :hockeyapp do
    sh "cd android && ./gradlew assembleRelease && puck -submit=auto app/build/outputs/apk/app-release.apk"
  end

  desc 'list adb devices'
  task :devices do
    sh "#{ADB} devices"
  end

  desc 'do an adb reverse (sometimes needed when connetion not working)'
  task :reverse do
    sh "#{ADB} reverse tcp:8081 tcp:8081"
  end


  desc 'adb reverse for simulator'
  task :simulator do
    sh "#{ADB} reverse tcp:8081 tcp:8081 && #{ADB} reverse tcp:5331 tcp:5331"
  end

  desc 'logcat adb'
  task :logcat do
    sh "#{ADB} logcat *:S ReactNative:V ReactNativeJS:V"
  end

  desc 'react-native log-android'
  task :log do
    sh "#{REACT_NATIVE_CMD} log-android"
  end

  desc 'pretend a shake'
  task :shake do
    sh "#{ADB} devices | grep '\\t' | awk '{print $1}' | sed 's/\\s//g' | xargs -I {} #{ADB} -s {} shell input keyevent 82"
  end

  desc 'trigger a reload'
  task :reload do
    sh "#{ADB} devices | grep '\\t' | awk '{print $1}' | sed 's/\\s//g' | xargs -I {} #{ADB} -s {} shell input text 'RR'"
  end

  desc 'run-android'
  task :run do
    sh "#{REACT_NATIVE_CMD} run-android"
  end

  desc 'run-android release'
  task :runrelease do
    sh "#{REACT_NATIVE_CMD} run-android --variant=release"
  end

  desc 'uninstall, clean and run-android'
  task :fresh => ['android:uninstall', 'android:clean'] do
    sh "#{REACT_NATIVE_CMD} run-android"
  end
end

namespace :codepush do
  desc 'codepush (android version, staging)'
  task :android, [:target_version] do |t,args|
    v = args[:target_version]
    sh "code-push release-react oliver.mueller/Minimal Android -d Staging -t #{v}"
  end

  desc 'codepush (ios version, staging)'
  task :ios do
    sh "code-push release-react oliver.mueller/MinimalIOS ios -d Staging"
  end
  desc 'codepush minimal info'
  task :info do
    sh "code-push deployment ls Minimal -k"
  end

  desc 'codepush MinimalIOS info'
  task :infoIOS do
    sh "code-push deployment ls MinimalIOS -k"
  end
end

namespace :ios do

  desc 'remove build artefacts for ios'
  task :clean do
    sh "rm -rf ios/build"
  end
  desc 'run-ios'
  task :run do
    sh "#{REACT_NATIVE_CMD} run-ios"
  end
  desc 'react-native log-ios'
  task :log do
    sh "#{REACT_NATIVE_CMD} log-ios"
  end
  desc 'install pods needed for ios'
  task :pods do
    cd 'ios' do
      sh 'pod install'
    end
  end
  desc 'clean, rebuild and run-ios'
  task :fresh => ['ios:clean', 'ios:pods'] do
    sh "#{REACT_NATIVE_CMD} run-ios"
  end
end
namespace :test do
  desc 'test & watch'
  task :watch do
    localExec "jest --watch"
  end
  desc 'update jest snapshots'
  task :snapshot do
    localExec "jest --updateSnapshot"
  end
  desc 'run jest with test coverage'
  task :coverage do
    localExec "jest --coverage && open coverage/lcov-report/index.html || xdg-open coverage/lcov-report/index.html"
  end
end

def lint(args)
  begin
    localExec "tslint -c tslint.json 'App/**/*.{ts,tsx}' --exclude 'App/Proto/generated/*.*' -t stylish #{args}"
  rescue Exception => ex
    puts "tslint: #{ex.message}"
  end
end
def lintDeep(args)
  begin
    localExec "tslint --project tsconfig.json --config tslint.json 'App/**/*.{ts,tsx}' --exclude 'App/Proto/generated/*.*' -t stylish #{args}"
  rescue Exception => ex
    puts "tslint: #{ex.message}"
  end
end
def tsc()
  begin
    localExec "tsc"
  rescue Exception => ex
    puts "tsc: #{ex.message}"
  end
end
desc 'run tslint'
task :lint do
  lint('')
  tsc()
end

desc 'run tslint (with --fix)'
task :fix do
  lint('--fix')
end

desc 'run tslint (with tsconfig integration)'
task :lintDeep do
  lintDeep('')
  tsc()
end

desc 'run tslint (with tsconfig integration and --fix)'
task :fixDeep do
  lintDeep('--fix')
  tsc()
end

namespace :git do
  task :hook do
    sh "npm run lint -s && npm run test -s"
  end
  desc 'show files ignored by git'
  task :ignored do
    sh "git status --ignored"
  end
end

desc 'open react native debugger'
task :debug do
  sh 'open "rndebugger://set-debugger-loc?host=localhost&port=8081"'
end

class Version < Array
  def initialize s
    super(s.split('.').map { |e| e.to_i })
  end
  def as_version_code
    get_major*1000*1000 + get_minor*1000 + get_patch
  end
  def < x
    (self <=> x) < 0
  end
  def > x
    (self <=> x) > 0
  end
  def == x
    (self <=> x) == 0
  end
  def patch
    patch = self.last
    self[0...-1].concat([patch + 1])
  end
  def minor
    self[1] = self[1] + 1
    self[2] = 0
    self
  end
  def major
    self[0] = self[0] + 1
    self[1] = 0
    self[2] = 0
    self
  end
  def get_major
    self[0]
  end
  def get_minor
    self[1]
  end
  def get_patch
    self[2]
  end
  def to_s
    self.join(".")
  end
end

desc 'build icon pngs from svgs'
task :icons do
  svgs = FileList.new("./App/Assets/svgs/large/*.svg")
  puts svgs
  small_svgs = FileList.new("./App/Assets/svgs/*.svg")
  puts small_svgs
  svgs.each do |svg|
    convert_svg(svg, 60, 60)
  end
  small_svgs.each do |svg|
    convert_svg(svg, 30, 30)
  end
end

def convert_svg(svg, width, height)
    comp = File.basename svg        # => "xyz.mp4"
    extn = File.extname  svg        # => ".mp4"
    name = File.basename svg, extn  # => "xyz"
    source_path = File.dirname  svg        # => "/path/to"
    dest_path = source_path.clone
    dest_path.sub!(/svgs/, "icons")
    build_icon(name, source_path, dest_path, width, height)
end

def build_icon(icon_name, path, dest_path, width, height)
  puts "build_icon(#{icon_name}, #{path}, #{dest_path}, #{width}, #{height})"
  sh "svgexport #{path}/#{icon_name}.svg #{dest_path}/#{icon_name}.png #{width}:#{height}"
  sh "svgexport #{path}/#{icon_name}.svg #{dest_path}/#{icon_name}@2x.png #{width * 2}:#{height * 2}"
  sh "svgexport #{path}/#{icon_name}.svg #{dest_path}/#{icon_name}@3x.png #{width * 3}:#{height * 3}"
end
namespace :version do
  namespace :patch do
    desc 'bump patch level ios + overall level'
    task :ios do
      next_version = update_package_version(:patch)
      update_ios_version(next_version)
    end
    desc 'bump patch level android + overall level'
    task :android do
      next_version = update_package_version(:patch)
      update_android_version(next_version)
    end
    desc 'bump patch overall level'
    task :overall do
      next_version = update_package_version(:patch)
      update_android_version(next_version)
      update_ios_version(next_version)
    end
    desc 'bump patch react'
    task :react do
      update_package_version(:patch)
    end
  end
  namespace :minor do
    desc 'bump minor level ios + overall level'
    task :ios do
      next_version = update_package_version(:minor)
      update_ios_version(next_version)
    end
    desc 'bump minor level android + overall level'
    task :android do
      next_version = update_package_version(:minor)
      update_android_version(next_version)
    end
    desc 'bump minor overall level'
    task :overall do
      next_version = update_package_version(:minor)
      update_android_version(next_version)
      update_ios_version(next_version)
    end
    desc 'bump minor react'
    task :react do
      update_package_version(:minor)
    end
  end
  desc 'bump major level'
  task :major do
    next_version = update_package_version(:major)
    update_ios_version(next_version)
    update_android_version(next_version)
  end
end
def update_ios_version(next_version)
  require 'plist'
  plist_content = Plist.parse_xml(IOS_PLIST)
  current_build_nr = plist_content["CFBundleVersion"]
  plist_content["CFBundleShortVersionString"] = next_version.to_s
  plist_content["CFBundleVersion"] = "#{Integer(current_build_nr) + 1}"
  newContent = plist_content.to_plist
  File.open(IOS_PLIST, 'w') { |file| file.write(newContent) }
end
def get_current_version
  require 'json'
  package_content = JSON.parse(File.read(PACKAGE))
  package_content["version"]
end
def update_package_version(update)
  require 'json'
  package_content = JSON.parse(File.read(PACKAGE))
  current_version = package_content["version"]
  v = Version.new(current_version)
  new_version = v.send(update)
  package_content["version"] = new_version.to_s
  File.open(PACKAGE,"w") do |f|
    f.write(JSON.pretty_generate(package_content))
  end
  return new_version
end
def update_android_version(next_version)
  r = File.readlines(GRADLE_PROPERTIES)
  changed_content = r.map do |line|
    process_line(line.strip, next_version)
  end
  File.open(GRADLE_PROPERTIES,"w") do |f|
    f.write(changed_content.join("\n"))
  end
end

def process_line(line, next_version)
  if line.length == 0
    return ""
  end
  if line.start_with?("#")
    return line
  end
  key,value = line.split("=")
  if key == 'MINIMAL_VERSION_NAME'
    return "#{key}=#{next_version.to_s}"
  end
  if key == 'MINIMAL_VERSION_CODE'
    return "#{key}=#{next_version.as_version_code}"
  end
  return line
end
