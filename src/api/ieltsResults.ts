class IeltsResult {
    getIeltListeningsResult(){

    const data = [
        {brandScore:5,name:"test",sessionDate:"22/07/27"},
        {brandScore:5,name:"test",sessionDate:"22/07/27"},
        {brandScore:5,name:"test",sessionDate:"22/07/27"},
        {brandScore:5,name:"test",sessionDate:"22/07/27"},
    ]

    return Promise.resolve({data})
    }
    getIeltReadingResult(){

    const data = [
        {brandScore:5,name:"test1",sessionDate:"22/07/27"},
        {brandScore:6,name:"test2",sessionDate:"22/07/27"},
        {brandScore:7,name:"test3",sessionDate:"22/07/27"},
        {brandScore:8,name:"test4",sessionDate:"22/07/27"},
    ]

    return Promise.resolve({data})
    }
}
export const ieltsApi = new IeltsResult();