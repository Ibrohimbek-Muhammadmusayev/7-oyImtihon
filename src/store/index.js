import {configureStore} from'@reduxjs/toolkit';
import todoSlices from './todoSlice';

const store = configureStore({
    reducer: {
      todo: todoSlices,
    },
  });
export default store;