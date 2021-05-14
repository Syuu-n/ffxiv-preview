# ffxiv-preview
![ffxiv-preview-image](https://user-images.githubusercontent.com/60782728/118216637-d8d3cb00-b4ae-11eb-87bb-64ef3ca6baff.png)

## 概要
FFXIV に登場する装備アイテムを画像つきで確認できるサイト。
現在は優先的に耳飾りを対応中。

### データの取得
データの取得は XIVAPI 及び Lodestone からのスクレイピングで取得。
これによりローカライズ情報とモデル情報を取得できる。

### 色違いのアイテム
同じデザインかつ色付違いのアイテムを関連アイテムとして確認可能。

## システムバージョン
- Ruby 3.0
- Ruby on Rails 6.0.3.6
- MySQL 8.0.23
- TypeScript 4.2.4
- Next.js 10.1.3
- React 17.0.2

### コマンド
## 環境構築
（事前に master.key を取得し api/config/ へ配置しておく）

```
$ git clone https://github.com/Syuu-n/ffxiv-preview.git

$ docker-compose build
$ docker-compose exec api bash
$ rails db:migrate
```

## システム起動
```
$ docker-compose up -d
```

## イメージ
### アイテム一覧
![ss1](https://user-images.githubusercontent.com/60782728/118217653-decaab80-b4b0-11eb-9606-99802d89edfc.png)

### アイテム詳細
![ss1](https://user-images.githubusercontent.com/60782728/118217665-e427f600-b4b0-11eb-99ab-8d618cb4f37c.png)

![ss1](https://user-images.githubusercontent.com/60782728/118217669-e68a5000-b4b0-11eb-9789-6786193c0c90.png)
