
## docker buildx imagetools inspect {image}:{tag}
Docker イメージ が、どのアーキテクチャ（CPUやOS）に対応しているか確認するためのコマンド

#### 例

`Platform: linux/arm64/v8`と表示されているので、mysql:8.4は「arm64」対応してる
```
$ docker buildx imagetools inspect mysql:8.4
Name:      docker.io/library/mysql:8.4
MediaType: application/vnd.oci.image.index.v1+json
Digest:    sha256:0f775a92980b41c87c58f934a204de80431dd4d854057160ec1cb936663eabe9

  Name:docker.io/library/mysql:8.4@sha256:2eb1304aed9a34e5889...
  MediaType:  application/vnd.oci.image.manifest.v1+json
  Platform:   linux/arm64/v8

...etc
```


https://docs.docker.com/build/building/multi-platform/