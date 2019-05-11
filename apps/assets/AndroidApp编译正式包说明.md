# Android App编译正式包说明
### 1.先把index.android.bundle文件生成放入Android目录下app/src/main/assets下 可在项目更目录执行如下命令 更多命令说明请查看react-native bundle --help

React-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false

可以看到app/src/main/assets 文件夹里面有bundle文件说明bundle文件生成成功
![assets目录](pic/assets目录.tiff)

### 2.bundle文件处理好之后,需要打开AndroidStudio(AS)进行apk的编译 

1. AS打开之后修改app/build.gradle中的versionName 版本名称依次递增(1.1.0)<br/><br/>![](pic/versionName.tiff)
2. 执行编译命令如下图点击assemableRelease<br/><br/>![](pic/Gradle编译apk.tiff)
3. release正式包打包完毕 可在app/build/outputs/apk 取出对应版本的release包进行备份<br/><br/>![](pic/releaseApk.tiff)

