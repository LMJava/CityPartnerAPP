# CityPartnerAPP

ultimateListView
:253    if (rows.length < pageLimit) {

有模拟字段的地方：
登录
修改密码
忘记密码
新增合伙人
新增推广人


\node_modules\react-native-picker\android\build.gradle
apply plugin: 'com.android.library'

android {
    compileSdkVersion 28
    buildToolsVersion "28.0.3"

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"

    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation 'com.facebook.react:react-native:+'
}












// 无效

assetPathUtils.js文件路径：node_modules\react-native\local-cli\bundle\assetPathUtils.js
LM修正 路径在：node_modules\react-native\Libraries\Image\assetPathUtils.js

修改：getAndroidAssetSuffix方法

修改前：

 function getAndroidAssetSuffix(scale) {
   switch (scale) {
    case 0.75: return 'ldpi';
    case 1: return 'mdpi';
    case 1.5: return 'hdpi';
    case 2: return 'xhdpi';
    case 3: return 'xxhdpi';
    case 4: return 'xxxhdpi';
   }
 }

修改后：

 function getAndroidAssetSuffix(scale) {
   switch (scale) {
     case 0.75: return 'ldpi-v4';
    case 1: return 'mdpi-v4';
    case 1.5: return 'hdpi-v4';
    case 2: return 'xhdpi-v4';
    case 3: return 'xxhdpi-v4';
    case 4: return 'xxxhdpi-v4';
   }
 }

修改完之后 把之前的drawable-xxx文件夹删掉，然后就可以正常打包了

drawable-xxx文件路径：YourProject\android\app\src\main\res