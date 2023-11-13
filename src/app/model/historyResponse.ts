export interface HistoryResponse {
  isCheckin: boolean,
  isCheckout: boolean,
  checkoutTime: string,
  checkinTime: string,
  workingTime: number,
  workingTimeStr: string
  workingDay: string
}

export interface HistoriesResponse {
  totalPage: number,
  totalRecord: number,
  timekeepingHistories: HistoryResponse[]

}
