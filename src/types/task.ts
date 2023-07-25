export default interface Task {
    id: string,
    title: string,
    description: string,
    date: Date,
    favorite: boolean,
    archived: boolean
}