# twitter-clone

Hajimari 内定者用の twitter-clone テンプレート
<br/>
<br/>

## 目的

この文書は Twitter Clone を作るにあたり、コーディングについて留意すべき事項をまとめたものである。
<br/>
<br/>

## 環境

### 環境構築に関しては、Docker にて行う。

Docker のインストールは、以下のリンクから行なってください。<br/>
→[Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)
<br/>
<br/>

## 命名規則

### 原則、クラス・メソッド・変数はキャメルケースで記述すること。

- ローマ字の使用を避け、英単語を使用すること。
- クラス名の頭文字は大文字で記述すること。
  <br/>
  <br/>

<bold><span style="color: red;">Bad Case</span></bold>

```
//これはスネークケース。
public function follow_user()
{
  //処理
}
```

<br/>
<br/>

<bold><span style="color: green;">Good Case</span></bold>

```
//こっちのキャメルケース推奨！
public function followUser()
{
  //処理
}
```

### そのクラスやメソッドがどんな処理をしているか分かる名前にすること。また、その変数が何を格納しているか分かる名前にすること。

```
//dataって何の？
$data = $user->id;
```

```
//この変数にはユーザーのIDが入ってる！
$userId = $user->id;
```

### 命名は、基本的に英語の文法に則って記述すること。

```
//日本語の文法（目的語→動詞）
public function userDataGet()
{
  //処理
}
```

```
//英語の文法（動詞→目的語）
public function getUserData()
{
  //処理
}
```

### その他、他の人が読みやすい命名を心がけること。

## コーディングスタイル

### マジックナンバーは避け、定数として設定する（Consts ファイルを作成して呼び出しても良い）。また、定数の場合は全て大文字で命名しても良い。

```
if($follower == 0){
  echo 'フォロワーはいません。';
}
```

```
public const NONE = 0;

if($follower == NONE){
  echo 'フォロワーはいません。';
}
```

### バリデーションは Form Request を使用すること。
