import axios from 'axios';

const serverfunctions = {
  getServerState: async () => {
    try {
      const { data } = await axios.get('http://localhost:3010/state/');
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  saveState: async (state) => {
    try {
      await axios.post('http://localhost:3010/state/', {
        ...state,
        tasks: state.tasks,
        columns: state.columns,
        columnOrder: state.columnOrder,
      });
      console.log('STATE SAVED TO SERVER!');
    } catch (error) {
      return console.log(error);
    }
  },

  getColors: async () => {
    try {
      let { data } = await axios.get('http://localhost:3010/colors');
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  saveColors: async (colors) => {
    try {
      await axios.post('http://localhost:3010/colors', {
        ...colors,
        background: colors.background,
        text: colors.text,
      });
      console.log('Colors saved!');
    } catch (error) {
      return console.log(error);
    }
  },
};

export default serverfunctions;
