<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->

<div align="center">
  <a href="https://github.com/woowa-techcamp-2022/web-fleamarket-07">
    <img src="https://user-images.githubusercontent.com/55688122/187194134-61a43026-d462-40ca-a39c-50d595444e61.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Web-FleaMarket-07</h3>

  <p align="center">
    2022년 우아한테크캠프 5기 중고거래 
    <br />
    <a href="https://flawless-oxygen-0b4.notion.site/7-9af709b0c19f4d6e855df07d46a24492">
      <strong>
        Notion docs »
      </strong>
    </a>
    <br />

<table align="center">
  <tr>
    <td>
      <a href="https://github.com/minsu-zip">
        <img src="https://avatars.githubusercontent.com/minsu-zip" width="100"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/pyo-sh">
        <img src="https://avatars.githubusercontent.com/pyo-sh" width="100"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/minsu-zip">
        <strong>
          박민수
        </strong>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pyo-sh">
        <strong>
          표석훈
        </strong>
      </a>
    </td>
  </tr>
</table>
    <br />
    <a href="http://3.34.128.180">View Demo</a>
    ·
    <a href="https://github.com/woowa-techcamp-2022/web-moneybook-09/issues">Report Bug</a>
    ·
    <a href="https://github.com/woowa-techcamp-2022/web-moneybook-09/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#ui">UIs</a>
      <ul>
        <li><a href="#main">Main</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#location">Location</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#menus">Menus</a></li>
      </ul>
    </li>
    <li><a href="#erd">ERD</a></li>
  </ol>
</details>

<br/>

## About The Project

- 2022.08.16 ~ 2022.08.29

중고 물품을 사고 팔 수 있는 사이트

게시판의 CRUD와 채팅 기능으로 중고 마켓을 사용할 수 있습니다.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Skills With

- ![TypeScript](https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

- ![SocketIO](https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

- ![Notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)

- ![Github](https://img.shields.io/badge/github-ouath-181717?style=for-the-badge&logo=github&logoColor=white)

### Front-End

- ![React](https://img.shields.io/badge/react-20232A?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Back-End

- ![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
</br>
<!-- GETTING STARTED -->

## Getting Started

`Yarn Berry`의 Plug & Play 기능과 Workspace 기능을 함께 사용하고 있습니다.

따라서 처음 프로젝트를 실행하기 위해서 다음과 같은 작업이 필요할 수 있습니다.

### Prerequisites

먼저 yarn을 설치해야 합니다.

- npm
  ```sh
  npm install yarn -g
  ```

### Installation

1. 레파지토리를 클론하세요
   ```sh
   git clone https://github.com/woowa-techcamp-2022/web-kiosk-pyosh.git
   ```
2. Yarn의 의존성들을 설치합니다.
   ```sh
   yarn install
   ```
3. VSCode에서 개발하고자 한다면 Yarn의 Typescript 라이브러리를 아래와 같이 적용해야 합니다. (Root Package.json에서 스크립트 지정을 해주었습니다)
   ```sh
   yarn initVscode
   ```
4. `Server`와 `Client`에서 동시에 사용하는 로직이나 타입들을 사용하기 위해서 빌드해야합니다.
   아래와 같이 `Common` 워크스페이스를 빌드해주어야 합니다
   ```js
   yarn common build
   ```
5. `Server`와 `Client`에서 환경변수 설정을 해주어야 합니다.
   [Server](https://github.com/woowa-techcamp-2022/web-kiosk-pyosh/blob/main/server/src/config/env.validation.ts)와 [Client](https://github.com/woowa-techcamp-2022/web-kiosk-pyosh/blob/main/client/src/constants/envs.ts) 파일에서 어떤 환경변수가 필요한지 선언하고 있으므로 확인하여 올바른 값을 추가하는 것이 좋겠습니다.
   - Github OAuth (Secret, ID)
   - AWS S3 (IAM Access, Secret, Region, Bucket)
   - MySQL Database
   - JWT
   - Socket Port

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br/>
<!-- UI -->

## UIs

### Main

현재 위치에 해당하는 상품 목록들을 제공해줍니다.

위치 정보를 `String`으로 처리하고 있어 기본 값은 `역삼동`입니다.

- 상품을 클릭하면 상품의 상세 정보로 이동합니다.
- 자신의 상품이면 컨트롤 할 수 있는 버튼이 제공됩니다.
- 다른 사람의 상품이면 관심 목록에 추가할 수 있는 버튼이 제공됩니다.

|                                                                 초기 옵션                                                                 |                                                                 카테고리                                                                  |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187203786-333fc563-3427-4276-8c2e-d31a4f6ac78b.png"> | <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187210516-eca30000-fc8d-4e9e-9ca3-03404ce3e160.png"> |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Login

Github OAuth를 통해서 유저 서비스를 제공하고 있습니다.

Github 정보 중 아이디, 프로필 사진을 이용해 회원가입과 로그인이 동시에 진행됩니다.

로그인에 성공하면 다음과 같이 메인 헤더에서 프로필 사진을 확인할 수 있습니다.

|                                                                 로그인 전                                                                 |                                                                 로그인 후                                                                 |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187207933-e4b21c52-0932-49b3-aacd-84c0dad41047.png"> | <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187208049-85225212-f7ca-41b6-aeab-ad87f1d12520.png"> |
| <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187208296-51b5a0cc-a58d-4ed7-a6c3-a9c2c5ae9789.png"> | <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187208349-2d985f5b-b68d-4901-901f-9a2af5d0211f.png"> |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Location

현재 위치는 String 값으로 지정되고 있습니다.

String 값을 Unique하게 사용하여 현재 위치들을 필터링합니다.

(따라서 철자 하나만 바뀌면 다른 지역으로 변경되는데, 이는 추후 변경되어야 할 사항입니다.)

|                                                               변경 드롭다운                                                               |                                                                  변경 후                                                                  |                                                                설정 페이지                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="210" alt="image" src="https://user-images.githubusercontent.com/55688122/187207533-aa08a406-2589-462a-a5a0-bdd9458a2b6d.png"> | <img width="210" alt="image" src="https://user-images.githubusercontent.com/55688122/187207585-d81b7fe7-22ab-4d16-803a-9f4952ed0037.png"> | <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187209039-64615a7f-bb89-41b0-86b2-bebb132b8d76.png"> |

|                                                                 생성 모달                                                                 |                                                        확인 & 삭제할 수 있는 버튼                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187209531-9e1d0149-fb2c-4352-b727-2f7c5df40ab9.png"> | <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187209813-2b9d5b26-eadc-4d51-ab05-b467fcc408e1.png"> |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Products

리스트에서 물품 아이템을 클릭하면 상세 물품을 볼 수 있습니다.

|                                                           다른 사람의 상세 물품                                                           |                                                             자신의 상세 물품                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187354018-a613b73b-3ef0-4b43-b2ee-8ad37de6b1c5.png"> | <img width="410" alt="image" src="https://user-images.githubusercontent.com/55688122/187354084-29948ca7-de61-4c30-bfd1-3e30558f02ae.png"> |

현재 페이지에서

- 다른 사람의 상품을 하트를 눌러 관심 목록에 넣을 수 있습니다.
- 자신의 상품은 현재 어떤 상태인지 변경할 수 있습니다

|                                                       관심 목록에 추가하기                                                        |                                                        상대방에게 문의하기                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| ![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/55688122/187357343-c3eaa497-852d-41dd-85b1-a041f3aa6efa.gif) | ![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/55688122/187357438-e9a8833d-e484-4e70-84ac-ab18ea58b47d.gif) |

### Menus

로그인 한 상태에서 메인 화면에서 오른쪽 위의 아이콘을 클릭하면 사용자와 관련된 기능들을 사용할 수 있습니다.

|                                                             사용자 판매 물품                                                              |                                                             사용자 관심 물품                                                              |                                                            사용자의 채팅 목록                                                             |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="273" alt="image" src="https://user-images.githubusercontent.com/55688122/187355056-86c2fcce-858a-4adc-ba52-3604b121ced0.png"> | <img width="273" alt="image" src="https://user-images.githubusercontent.com/55688122/187355161-9f69cdbd-f855-4566-8384-380b22becaac.png"> | <img width="273" alt="image" src="https://user-images.githubusercontent.com/55688122/187355268-b826de21-203d-45ea-a16c-c57f7e4270e4.png"> |

### Chats

상대방과의 실시간 채팅을 진행할 수 있습니다.

채팅을 확인하다가 다른 사람의 채팅이 오면 아래에 보이며 클릭하면 맨 아래로 이동합니다.

|                                                                실시간 채팅                                                                |                                                          최근 채팅 확인 및 이동                                                           |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="548" alt="image" src="https://user-images.githubusercontent.com/55688122/187359458-3239cf0e-bd20-4998-9840-f524dfc901e8.gif"> | <img width="262" alt="image" src="https://user-images.githubusercontent.com/55688122/187359713-7dec199a-e408-49fb-bb22-3abf1f9c2e91.gif"> |

<br/>
<!-- Entity Relationship Diagram -->

## ERD

<img src="https://user-images.githubusercontent.com/55688122/183259287-319d1fcb-01f2-4cf2-bd29-c524f9aec44d.png" width=800/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
