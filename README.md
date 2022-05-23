# twitter-clone

![Laravel](https://www.unagino-nedoko.com/wp-content/uploads/2021/10/logo_Laravel.png)

Hajimari 内定者用の twitter-clone テンプレート

## 目的

この文書は Twitter Clone を作るにあたり、コーディングについて留意すべき事項をまとめたものである。

## 環境

### 環境構築に関しては、Docker にて行う。

Docker のインストールは、以下のリンクから行なってください。

→ [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)

## 命名規則

### 原則、クラス・メソッド・変数はキャメルケースで記述すること。

- ローマ字の使用を避け、英単語を使用すること。
- クラス名はアッパーキャメルケース（頭文字が大文字）で記述すること。
- 変数・メソッド名はローワーキャメルケース（頭文字が小文字）で記述すること。

キャメルケースの種類に関しては、以下を参考にしてください。

→ [アッパーキャメルケース](https://wa3.i-3-i.info/word13954.html)

#### Bad Case

```php
/*
 * これはスネークケース。
 * Twitter Cloneでは避けるように（他の案件では採用される場合もある）。
 */
public function follow_user()
{
    //処理
}
```

#### Good Case

```php
//こっちのキャメルケース推奨！
public function followUser()
{
    //処理
}
```

### 名前を読んで内容が分かるようにすること。

- クラスやメソッドがどんな機能なのかが一目で分かる命名を心がける。
- 変数名を読んで、何が格納されているのかが一目で分かる命名を心がける。

#### Bad Case

```php
//dataって何の？
$data = $user->id;
```

#### Good Case

```php
//この変数にはユーザーのIDが入ってる！
$userId = $user()->id();
```

### 命名は、基本的に英語の文法に則って記述すること。

#### Bad Case

```php
//日本語の文法（目的語→動詞）
public function userDataGet()
{
    //処理
}

//get と edit と動詞が連続している。
public function getEditTweet()
{
    //処理
}
```

#### Good Case

```php
//英語の文法（動詞→目的語）
public function getUserData()
{
    //処理
}

/*
 * 動詞 edit を Editing にして名詞化する。
 * または他の命名が出来ないか再考してみる。
 */
public function getTweetEditing()
{
    //処理
}
```

### その他、他の人が読みやすい命名を心がけること。

## コーディングスタイル

### マジックナンバーは避け、定数として設定する（Consts ファイルを作成して呼び出しても良い）。また、定数の場合は全て大文字で命名しても良い。

#### Bad Case

```php
if($follower == 0){
  echo 'フォロワーはいません。';
}
```

#### Good Case

```php
public const NONE = 0;

if($follower == NONE){
  echo 'フォロワーはいません。';
}
```

### バリデーションは Form Request を使用すること。
