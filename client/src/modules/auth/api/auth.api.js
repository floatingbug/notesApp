import http from '@/services/http.service.js'

export function signin({ credentials }) {
	return http.post('/auth/sign-in', credentials)
}

export function signup(data) {
	return http.post('/auth/sign-up', data)
}

export function logout() {
	return http.post('/auth/sign-out')
}

export function getCurrentUser() {
	return http.get('/auth/me')
}

export function verifyEmail({ token }) {
	return http.get(`/auth/verify-email?token=${token}`)
}

export function resendVerificationEmail({ email }) {
	return http.post('/auth/verify-email/resend', { email })
}

export function requestPasswordReset({ email }) {
	return http.post('/auth/forgot-password', { email })
}

export function resetPassword({ token, password }) {
	return http.post('/auth/reset-password', { token, password })
}
