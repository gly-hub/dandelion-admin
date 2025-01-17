package encrypt

import "testing"

func TestMD5(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "empty string",
			input:    "",
			expected: "d41d8cd98f00b204e9800998ecf8427e",
		},
		{
			name:     "hello world",
			input:    "hello world",
			expected: "5eb63bbbe01eeed093cb22bb8f5acdc3",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := MD5(tt.input); got != tt.expected {
				t.Errorf("MD5() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMD5WithSalt(t *testing.T) {
	tests := []struct {
		name     string
		str      string
		salt     string
		expected string
	}{
		{
			name:     "with empty salt",
			str:      "password",
			salt:     "",
			expected: "5f4dcc3b5aa765d61d8327deb882cf99",
		},
		{
			name:     "with salt",
			str:      "password",
			salt:     "123",
			expected: "123934bb19708f8dac76a2e31f91cef0",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := MD5WithSalt(tt.str, tt.salt); got != tt.expected {
				t.Errorf("MD5WithSalt() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestVerifyMD5(t *testing.T) {
	tests := []struct {
		name     string
		str      string
		md5str   string
		expected bool
	}{
		{
			name:     "correct md5 lowercase",
			str:      "hello world",
			md5str:   "5eb63bbbe01eeed093cb22bb8f5acdc3",
			expected: true,
		},
		{
			name:     "correct md5 uppercase",
			str:      "hello world",
			md5str:   "5EB63BBBE01EEED093CB22BB8F5ACDC3",
			expected: true,
		},
		{
			name:     "incorrect md5",
			str:      "hello world",
			md5str:   "wrongmd5hash",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := VerifyMD5(tt.str, tt.md5str); got != tt.expected {
				t.Errorf("VerifyMD5() = %v, want %v", got, tt.expected)
			}
		})
	}
}
