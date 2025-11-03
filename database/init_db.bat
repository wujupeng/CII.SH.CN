@echo off

REM PostgreSQL安装路径 - 假设默认安装路径
set PG_BIN="C:\Program Files\PostgreSQL\14\bin\psql"

REM 数据库连接信息
set DB_NAME=asset_tracking
set DB_USER=root
set DB_PASS=Admin@1234
set DB_HOST=localhost
set DB_PORT=5432

REM 设置环境变量以便psql可以使用密码
set PGPASSWORD=%DB_PASS%

REM 创建数据库（如果不存在）
%PG_BIN% -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "CREATE DATABASE %DB_NAME%"

REM 执行schema.sql脚本
%PG_BIN% -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f schema.sql