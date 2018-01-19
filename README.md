#  minimal example using codepush

try to reproduce [this error](https://github.com/Microsoft/react-native-code-push/issues/1144)

# usage

## install npm packages

    yarn install

## create android release build and flash to attached phone (using adb)

    rake android:reinstall

## tests in debug environment

    rake android:runfresh
