export interface IDB {
  connectDB(): Promise<void>
  disconnectDB(): Promise<void>
}
