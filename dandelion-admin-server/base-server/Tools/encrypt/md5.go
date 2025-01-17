package encrypt

import (
	"crypto/md5"
	"encoding/hex"
	"strings"
)

// MD5 计算字符串的MD5值，返回32位小写字符串
func MD5(str string) string {
	h := md5.New()
	h.Write([]byte(str))
	return hex.EncodeToString(h.Sum(nil))
}

// MD5Upper 计算字符串的MD5值，返回32位大写字符串
func MD5Upper(str string) string {
	return strings.ToUpper(MD5(str))
}

// MD5WithSalt 计算带盐值的MD5，返回32位小写字符串
func MD5WithSalt(str, salt string) string {
	return MD5(str + salt)
}

// MD5WithSaltUpper 计算带盐值的MD5，返回32位大写字符串
func MD5WithSaltUpper(str, salt string) string {
	return strings.ToUpper(MD5WithSalt(str, salt))
}

// VerifyMD5 验证字符串与MD5是否匹配（不区分大小写）
func VerifyMD5(str, md5str string) bool {
	return strings.EqualFold(MD5(str), md5str)
}

// VerifyMD5WithSalt 验证字符串与加盐的MD5是否匹配（不区分大小写）
func VerifyMD5WithSalt(str, salt, md5str string) bool {
	return strings.EqualFold(MD5WithSalt(str, salt), md5str)
}
