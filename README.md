## 👑 팀 명작
> 남양주시 테니스장 예약 자동화 서비스

<p>
  <img src="https://img.shields.io/badge/JavaScript-E9D317?style=flat-square&logo=JavaScript&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/Azure-0078D4?style=flat-square&logo=Microsoft Azure&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=Ubuntu&logoColor=white"/>&nbsp
</p>

<br>

- <h3><a href="https://seongsu.me/project/reservation-automation" target="_blank">프로젝트 회고</a></h3>

<br>

## 🎯 프로젝트 개요

테니스클럽의 회원인 A는 00시 공공 테니스코트를 예약하려 하지만, 라이벌 테니스클럽의 특정 매크로의 독점으로 인해 예약이 거의 불가능한 상황입니다.<br>

이러한 불편함을 해소하고자, 사용자가 ~~[프로젝트 사이트](https://myungjak.kr)~~ (현재 사용되지 않음) 에서,
예약 프로그램이 실행되길 원하는 시간, 테니스코트장 번호, 예약시간대 등을 입력하면
서버의 내부 트리거가 지속적으로 확인 후 입력된 프로그램 실행시간이 되었을 때 자동으로 00시 테니스 코트를 예약할 수 있도록 제작되었습니다.

<br>

## 👨‍👦‍👦 팀 소개

> #### PM [박승한](https://github.com/KOREAparksh) - 기획 및 설계
> #### Frontend [김현승](https://github.com/hyeonski) - Frontend 비즈니스 로직 개발
> #### Frontend [김성우](https://github.com/tjddnghkrk) - Frontend 퍼블리싱
> #### Backend [박성수](https://github.com/seongs1024) - 데이터베이스 설계 및 개발
> #### Backend [김성수](https://github.com/nfl1ryxditimo12) - 예약 프로세스, 트리거 개발

<br>

## 완성 결과물

> 메인 페이지

<div style="width: 100%; text-align: center; display: flex; flex-direction: row;">
    <img style="display: inline-block; width: 40%;" src="https://user-images.githubusercontent.com/74334399/197693056-58e1c17e-64b5-4726-b4f1-9c6211ae92f5.jpg">
  <img style="display: inline-block; width: 40%;" src="https://user-images.githubusercontent.com/74334399/197694910-e6c004b7-5bae-4457-b6ed-e5ea7aa826fd.png">                                                                            
</div>

```
명세와 비슷한 결과물이 나왔다
```

<br>

> 예약 리스트

<div style="width: 100%; text-align: center; display: flex; flex-direction: row;">
  <img style="display: inline-block; width: 40%;" src="https://user-images.githubusercontent.com/74334399/197697609-99459664-a7d2-4084-82b3-7acd50761e20.png">
  <img style="display: inline-block; width: 40%;" src="https://user-images.githubusercontent.com/74334399/197697757-9d924f12-e488-4a97-903a-91447a7741c6.png">                                                                            
</div>

```SHELL
예약 프로세스가 실행되기 전 -> 실행된 후이다.
```

<br>

## 💭 프로젝트 TMI

![20220330_155305](https://user-images.githubusercontent.com/74334399/197699709-ff2ec508-3d2b-4471-b5ff-e55deebc9000.jpg)

```
😪 밤샘 코딩으로 쓰러져 있는 김성수씨...
```

<br>

![20220331_164941](https://user-images.githubusercontent.com/74334399/197699475-4024f859-a037-4f51-a802-dd2c819c7f62.jpg)

```
🍖 완성 기념으로 프로젝트 리딩해 주신 멘토님이 사주신 소고기

@김현승님, @김성우님은 개인 일정으로 빠지셨다 😅
```

<br>

## 🖋 개발 내용 및 명세

<br>

### 👉🏻ㅤ요구사항 명세

<img style="width: 50%" src="https://user-images.githubusercontent.com/74334399/197693056-58e1c17e-64b5-4726-b4f1-9c6211ae92f5.jpg">

<img width="865" alt="요구사항기술서" src="https://user-images.githubusercontent.com/74334399/197693495-515acf15-eedd-4160-89d7-5bcbe7b6f2d1.png">

```
💡 요청받은 요구사항과 대략적인 화면레이아웃을 바탕으로, 필수 요구사항 추출
```

<br>

### 👉🏻ㅤ사용자 예상 시나리오

![사용자_예상_시나리오](https://user-images.githubusercontent.com/74334399/197693716-f2573429-15fc-490a-bc93-99c8bfbd2007.png)

```SHELL
💡 사용자 예상 시나리오 (flow cart) # 서버 프로세스는 아래 기재
```

<br>

### 👉🏻ㅤ예약 프로세스 설계도 및 시퀀스 다이어그램

> 설계도

![예약_프로세스_설계도](https://user-images.githubusercontent.com/74334399/197694025-c5918b36-be15-478d-b985-6b032848d10a.png)

<br>

> 시퀀스 다이어그램

![예약_프로세스_시퀀스_다이어그램](https://user-images.githubusercontent.com/74334399/197694077-6dbc4c41-e37c-4b36-a4cf-3a74edfe9afa.png)

<br>

> 프로세스 간략도

![예약_프로세스_간략도](https://user-images.githubusercontent.com/74334399/197694188-30e0d1b4-df0f-4197-a75c-359309fb3b0a.png)


```SHELL
1. 10시 05분에 예약정보 확인 시 내부 트리거에서 WAS로 예약요청 전송.
2. 비동기 프로세스를 활용하여 병렬로 요청이 전송.
3. 예약 건 하나 당 00시 테니스 코트 서버로 분당 120번의 예약 요청 전송하게 됨.
4. 예약 건 중 완료 응답이 온다면 해당 건의 모든 프로세스 즉시 종료.
```

<br>

### 👉🏻ㅤERD 및 DFD

> ERD

<img width="480" alt="ERD" src="https://user-images.githubusercontent.com/74334399/197694463-10b0c867-0df5-4025-8d0a-2d01205a8a39.png">

<br>

> DFD

<img width="791" alt="DFD" src="https://user-images.githubusercontent.com/74334399/197694493-976abcbc-847b-4145-98ba-1faa9ab16639.png">

