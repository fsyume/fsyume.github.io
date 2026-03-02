# 延期Windows 11更新

> 2026年3月2日
>
> win11 25H2可用

powershell管理员运行

```ps1
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings" /v FlightSettingsMaxPauseDays /t reg_dword /d 10000 /f
```