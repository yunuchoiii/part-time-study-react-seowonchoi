# StudyWork 프로젝트

## 프로젝트 개요
StudyWork 프론트엔드 채용 과정 중 과제에 대한 레포지토리입니다.
이 프로젝트는 사용자의 공부 시간을 측정하고 우리 지점의 랭킹 시스템을 제공하는 웹 애플리케이션입니다. 

## 프로젝트 구조
```
public
 ┣ images           # 아이콘 및 UI 이미지
 ┃ ┣ arrow-right.png
 ┃ ┣ icon_cam.png
 ┃ ┣ icon_coin.png
 ┃ ┣ icon_pencil.png
 ┃ ┣ icon_qr.png
 ┃ ┣ icon_refresh.png
 ┃ ┣ img_1.png
 ┃ ┣ img_2.png
 ┃ ┗ img_3.png
 ┣ lottie           # Lottie 애니메이션 파일 저장소
 ┃ ┣ confetti.json
 ┃ ┗ loader.json
src
 ┣ app
 ┃ ┣ (routes)     # 주요 라우트 페이지
 ┃ ┃ ┣ timer      # 공부 타이머 페이지
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┗ page.tsx   # 메인 페이지
 ┃ ┣ api          # API 라우트 핸들러
 ┃ ┃ ┗ ranking
 ┃ ┃ ┃ ┗ route.ts
 ┃ ┗ layout.tsx   # 레이아웃
 ┣ components      # UI 컴포넌트 모음
 ┃ ┣ buttons     # 버튼 관련 컴포넌트
 ┃ ┃ ┗ FloatingButton.tsx
 ┃ ┣ cards       # 카드형 컴포넌트 (예: 공부 타이머 카드)
 ┃ ┃ ┗ TimerCard.tsx
 ┃ ┣ loader      # 로딩 UI 관련 컴포넌트
 ┃ ┃ ┗ CircularLoader.tsx
 ┃ ┣ modal       # 모달 관련 컴포넌트
 ┃ ┃ ┣ ConfettiModal.tsx
 ┃ ┃ ┗ QRLoginModal.tsx
 ┃ ┣ ranking     # 랭킹 관련 UI 컴포넌트
 ┃ ┃ ┗ RankingItem.tsx
 ┃ ┗ slider      # 슬라이더 UI 컴포넌트
 ┃ ┃ ┗ Slider.tsx
 ┣ fonts           # 폰트 파일
 ┃ ┗ PretendardVariable.woff2
 ┣ hooks           # 커스텀 훅
 ┃ ┣ useRanking.ts # 랭킹 데이터 관리
 ┃ ┣ useScroll.ts  # 스크롤 이벤트 관리
 ┃ ┗ useTimer.ts   # 공부 타이머 상태 관리
 ┣ services        # API 서비스
 ┃ ┗ rankingService.ts
 ┣ styles          # CSS 파일
 ┃ ┗ globals.css
 ┣ types           # 타입 정의)
 ┃ ┗ rank.ts
 ┣ utils           # 유틸리티 함수
 ┃ ┗ index.ts
 ┣ __test__        # 테스트코드 파일
 ┃ ┗ hooks
 ┃ ┃ ┣ useRanking.test.tsx
 ┃ ┃ ┗ useTimer.test.tsx
```

## 주요 기능

### 1. 랭킹 시스템 (Ranking)
- 무한 스크롤 방식으로 랭킹 데이터를 불러옴
- 100개 이상의 더미 데이터를 기반으로 페이지네이션 적용
- 내 랭킹이 1-3위일 경우 축하 모달 띄움
- 100~200개 사이의 더미 데이터 랜덤 생성 (향후 서버 데이터 적용)
- 내 랭킹은 1~10위 중 랜덤 배정 (향후 서버 데이터 적용)

### 2. 공부 타이머 (Timer)
- 페이지 진입 시 공부 시간을 자동 측정
- 1초마다 증가, 1분마다 공부 상금(500원)과 영상 개수 증가
- 데이터는 `localStorage`에 저장되어, 페이지 새로고침 후에도 유지

### 3. QR 로그인 모달
- QR 코드를 생성하고 3분간 인증 가능
- 3분이 지나면 인증이 만료
- 재생성 버튼 클릭하면 QR 코드 재생성

### 4. 애니메이션 및 인터랙션
- Lottie 애니메이션을 활용 (Loader & Confetti)
- 공부 타이머 페이지에 자동 슬라이드 배너 적용 (5초마다 변경)
- 스크롤 방향에 따른 플로팅버튼 크기 조정 애니메이션 적용
- Header 상단 고정 및 스크롤 위치에 따른 Header 그림자 효과 적용
- Lodash / throttle 최적화 적용

### 5. 테스트 코드 작성
- Jest & Testing Library 활용한 테스트 코드 작성
- 커스텀훅 작동 테스트 코드 구현

## 기술 스택
| 기술          | 사용 목적 |
|--------------|----------|
| Next.js  | App Router 기반의 SSR 및 클라이언트 사이드 렌더링 |
| TypeScript | 타입 안정성을 위해 적용 |
| TailwindCSS | 스타일링 및 반응형 UI 구현 |
| Lottie | 로딩 애니메이션 적용 |
| Lodash | `throttle` 활용하여 성능 최적화 |
| Jest & Testing Library | 테스트 코드 구현 |

## 구현 방향
- 확장성을 고려한 폴더 구조: 컴포넌트, 훅, 서비스 분리
- 가독성과 유지보수를 고려한 네이밍 컨벤션 적용
- 요구사항을 충족하면서도 최적의 성능을 고려한 코드 작성

## 실행 방법
```bash
# 1. 프로젝트 클론
git clone https://github.com/yunuchoiii/part-time-study-react-seowonchoi.git

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 로컬 환경에서 실행 (http://localhost:3000)
```

## 추가 개선 사항
- API 연동 시, 실제 데이터를 기반으로 랭킹 시스템 개선
- 서버 상태 관리 도입 (React Query 또는 SWR 활용 가능)
