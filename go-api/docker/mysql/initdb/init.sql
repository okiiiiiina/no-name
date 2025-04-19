-- MySQL公式ドキュメントにおける文字セットの推奨事項については、以下を参照:
-- https://dev.mysql.com/doc/refman/8.0/ja/charset-unicode.html

CREATE DATABASE IF NOT EXISTS coredb
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;