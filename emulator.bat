@echo off 
if "%1"=="h" goto begin 
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit 
:begin
::����·����д�Լ���·����-avd�����д�Լ�Android Studioģ��������򿪵�����
D:\Android\Sdk\tools\emulator.exe -netdelay none -netspeed full -avd Nexus_6_API_27
pause