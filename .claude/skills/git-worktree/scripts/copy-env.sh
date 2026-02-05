#!/bin/bash

# 사용법 안내 함수
usage() {
    echo "사용법: $0 [타겟파일명]"
    echo "예시:"
    echo "  $0 .env.local    # .env를 .env.local로 복사"
    echo "  $0               # 기본값(.env.local)으로 복사"
    exit 1
}

# 스크립트 실행 위치가 프로젝트 루트인지 확인 (package.json 존재 여부로 단순 체크)
if [ ! -f "package.json" ]; then
    echo "⚠️  경고: package.json이 보이지 않습니다. 프로젝트 루트에서 실행하는 것이 좋습니다."
fi

# 소스 파일 설정
SOURCE_FILE=".env"

# 타겟 파일 설정 (인자가 없으면 기본값 .env.local)
TARGET_FILE="${1:-.env.local}"

# 소스 파일 존재 여부 확인
if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ 오류: $SOURCE_FILE 파일이 현재 디렉토리에 없습니다."
    echo "프로젝트 루트 디렉토리에서 실행해주세요."
    exit 1
fi

# 타겟 파일 존재 여부 확인 및 덮어쓰기 질문
if [ -f "$TARGET_FILE" ]; then
    read -p "⚠️  $TARGET_FILE 파일이 이미 존재합니다. 덮어쓰시겠습니까? (y/N): " answer
    case ${answer:0:1} in
        y|Y )
            echo "덮어쓰기를 진행합니다..."
            ;;
        * )
            echo "작업을 취소합니다."
            exit 0
            ;;
    esac
fi

# 파일 복사
cp "$SOURCE_FILE" "$TARGET_FILE"

if [ $? -eq 0 ]; then
    echo "✅ 성공: $SOURCE_FILE 파일이 $TARGET_FILE (으)로 복사되었습니다."
else
    echo "❌ 실패: 파일 복사 중 오류가 발생했습니다."
    exit 1
fi
