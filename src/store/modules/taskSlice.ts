import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import Task from '../../types/task'



const taskAdapter = createEntityAdapter<Task>({
    selectId:(task) => task.id
})

export const taskSlice = createSlice({
  name: 'task',
  initialState: taskAdapter.getInitialState(),
  reducers: {
    addOneTask: taskAdapter.addOne,
    updateOneTask: taskAdapter.updateOne,
    deleteOneTask: taskAdapter.removeOne
  },
})

export const { addOneTask, updateOneTask, deleteOneTask } = taskSlice.actions


export default taskSlice.reducer