@echo off 
if "%1"=="h" goto begin 
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit 
:begin
::启动路径填写自己的路径，-avd后面的写自己Android Studio模拟器中想打开的名字
D:\Android\Sdk\tools\emulator.exe -netdelay none -netspeed full -avd Nexus_6_API_27
pause