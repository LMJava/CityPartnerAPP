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
