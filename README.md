# ffxiv-titan-jail

파티원 정보를 따로 입력하지 않아도 알아서 절테마 돌감옥 순서를 알려주는 오버레이

## Features

- 대상자 3명의 잡 아이콘을 오버레이로 보여 줍니다.
- 내가 대상자이면 몇 번째인지를, 대상자가 아니면 대상자 3명의 직업을 TTS로 읽어 줍니다.

## Requirements

- [ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

## Install

> https://chalkpe.github.io/ffxiv-titan-jail

1. `Advanced Combat Tracker` 실행
1. `Plugins` → `OverlayPlugin.dll` 탭으로 이동
1. `New` 클릭 → `Name` 칸에 원하는 이름 입력
1. `Preset` 값을 `Custom`으로 설정 후 `OK` 클릭
1. 좌측에 추가된 오버레이 클릭 → `URL` 칸에 위 링크 입력
1. `Reload overlay` 클릭 → TTS 목소리가 들리면 설치 완료!

### Commands

- `/혼 돌감옥`
  - 현재 돌감옥 우선순위를 읽어 줍니다
- `/혼 돌감옥 암전건나용사몽닌음기무흑솬적백점학`
  - 돌감옥 우선순위를 설정합니다 (꼭 모든 직업을 다 쓸 필요는 없음)

## License

[MIT License](LICENSE)