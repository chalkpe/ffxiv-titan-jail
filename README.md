# ffxiv-titan-jail

![나용닌](https://i.imgur.com/EX2IG4o.png)

파티원 목록을 따로 입력하지 않아도 알아서 절테마 돌감옥 순서를 알려주는 오버레이

## 기능

- 대상자 3명의 잡 아이콘을 오버레이로 보여 줍니다.
- 내가 대상자이면 몇 번째인지를, 대상자가 아니면 대상자 3명의 잡을 TTS로 읽어 줍니다.
- `/혼 돌감옥` 명령어로 원하는 돌감옥 우선순위를 다시 설정할 수 있습니다.

## 요구사항

- **[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)**
- [Advanced Combat Tracker](https://advancedcombattracker.com)

## 설치

### 해루봇으로 연결

- [해루봇 → **오버레이** 탭 → `Titan Jail`](https://blog.naver.com/ffxivhaeru/222182321501)
- **플러그인** 탭에 있는 동명의 다른 플러그인과 혼동 주의

### 직접 추가

> https://chalkpe.github.io/ffxiv-titan-jail

1. `Advanced Combat Tracker` 실행
1. `Plugins` → `OverlayPlugin.dll` 탭으로 이동
1. `New` 클릭 → `Name` 칸에 원하는 이름 입력
1. `Preset` 값을 `Custom`으로 설정 후 `OK` 클릭
1. 좌측에 추가된 오버레이 클릭 → `URL` 칸에 위 링크 복붙
1. `Reload overlay` 클릭 → 게임 채팅에 `/혼 돌감옥` 입력
1. 우선순위를 읽어 주는 TTS 소리가 들리면 설치 완료!

## 명령어

- `/혼 돌감옥`
  - 현재 돌감옥 우선순위를 읽어 줍니다.
  - 자동 실행: 절 알테마 파괴작전 입장 시
- `/혼 돌감옥 나용닌음솬점학`
  - 돌감옥 우선순위를 설정합니다.
  - 기본값: `암전건나용사몽닌음기무흑솬적백점학`

## 라이선스

[MIT License](LICENSE)
