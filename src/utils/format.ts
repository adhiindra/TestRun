import dayjs from "dayjs"

export const clockify = (secNumber : number) => {
    let hours = Math.floor(secNumber / 60 / 60)
    let mins = Math.floor((secNumber / 60) % 60)
    let seconds = Math.floor(secNumber % 60)
    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      displayHours,
      displayMins,
      displaySecs,
    }
  }

  export const getDateSeconds = () => {
      return new Date(Date.now()).getTime() / 1000
  }

  export const formatDecimals = (decNumber : number) => {
      return parseInt(decNumber.toFixed(0), 10) 
  }

  export const secToMins = (secNumber: string) => {
    return (
      secNumber.length === 0 ? '' : Math.floor(parseInt(secNumber)  / 60).toString()
    )
  }
