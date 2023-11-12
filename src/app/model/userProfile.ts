export interface UserProfile {
  keycloakId?: string,
  username?: string,
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
  isActive?: boolean,
  email?: string
  createdAt?: string
  roles?: string[]
}
