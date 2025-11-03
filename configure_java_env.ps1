# 简单的Java环境变量配置脚本
$javaHome = "C:\Program Files\Java\jdk-17"
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, [System.EnvironmentVariableTarget]::User)
$javaBin = "$javaHome\bin"
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User)
if (-not ($currentPath -like "*$javaBin*")) {
    $newPath = "$currentPath;$javaBin"
    [System.Environment]::SetEnvironmentVariable("PATH", $newPath, [System.EnvironmentVariableTarget]::User)
}
Write-Host "Java环境变量已配置！JAVA_HOME=$javaHome"