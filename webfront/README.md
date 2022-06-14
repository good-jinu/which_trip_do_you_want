# ghpage-template

 깃허브 레포지토리에 대한 문서를 github page를 활용하여 웹페이지 형식으로 정리할 때 사용하기 위한 템플릿

## 내용 수정

### 1. package.json 수정

 package.json에서 두번째 줄, json의 첫번째 아이템은 다음과 같다.

```
"homepage": "https://good-jinu.github.io/ghpage-template/"
```

homepage의 value를 만들려는 레포지토리 github-page의 url을 넣는다.

## create github page

### 1. 웹 어플리케이션 빌드하기

```
npm run build
```

위의 명령어를 실행하면 빌드된 디렉토리가 생겨난다. 디렉토리의 이름은 build/ 이다.

### 2. create ghpage branch

ghpage를 만들고자하는 repository에서 orphan branch를 생성한다.

```
git branch --orphan ghpage
```

그러고 나면 git디렉토리 에서 ".git/"을 제외한 나머지를 모두 깨끗하게 제거한다.

### 3. move web application to repository

ghpage-template로 생성한 앱을 레포지토리의 ghpage 브랜치에 옮긴다. 이 때 "build/" 디렉토리 내부에 파일들만 모두 옮기고 build디렉토리 자체를 옮기지는 않는다.

### 4. set page

레포지토리의 setting의 page 메뉴에서 ghpage 브랜치의 root를 page로써 설정하고 save한다.