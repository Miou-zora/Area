import {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Switch,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {useAuth} from '../context/UserContext';

const AddComponent = () => {
  interface ParamItem {
    nameParam: string;
    typeParam: string;
    param: any;
  }

  const [nameArea, setNameArea] = useState('');
  const [selectedAction, setSelectedAction] = useState('Action');
  const [selectedReaction, setSelectedReaction] = useState('Reaction');
  const [showlistAction, setShowListAction] = useState(false);
  const [showlistReaction, setShowListReaction] = useState(false);
  const [listAction, setListAction] = useState<string[]>();
  const [listReaction, setListReaction] = useState<string[]>();

  const [listParamAction, setListParamAction] = useState<ParamItem[]>([]);
  const [listParamReaction, setListParamReaction] = useState<ParamItem[]>([]);

  const [modelParamAction, setModelParamAction] = useState<any>([]);
  const [modelParamReaction, setModelParamReaction] = useState<any>([]);
  const {token} = useAuth();

  const handleNameAreaChange = (text: string) => {
    setNameArea(text);
  };

  const handleClickActionList = () => {
    setShowListAction(!showlistAction);
    setShowListReaction(false);
  };

  const handleClickReactionList = () => {
    setShowListReaction(!showlistReaction);
    setShowListAction(false);
  };

  const handleActionAreaChange = async (event: string) => {
    setSelectedAction(event);
    setListParamAction([]);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + '/' + token + '/actions/' + event,
      );
      const allPropertyNames = Object.keys(
        response.data,
      ) as (keyof typeof response.data)[];
      const updatedList = allPropertyNames.map(async key => {
        const data = response.data[key];
        const variableType = typeof data;
        return {
          nameParam: String(key),
          typeParam: variableType,
          param: null,
        };
      });
      const resolvedList = await Promise.all(updatedList);

      setListParamAction(await resolvedList);
      setModelParamAction(await response.data);
    } catch (error) {
      console.error(error);
    }
    setShowListAction(false);
  };

  const handleReactionAreaChange = async (event: string) => {
    setSelectedReaction(event);
    setListParamReaction([]);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + '/' + token + '/reactions/' + event,
      );
      const allPropertyNames = Object.keys(
        response.data,
      ) as (keyof typeof response.data)[];
      const updatedList = allPropertyNames.map(async key => {
        const data = response.data[key];
        const variableType = typeof data;
        return {
          nameParam: String(key),
          typeParam: variableType,
          param: null,
        };
      });

      const resolvedList = await Promise.all(updatedList);
      setListParamReaction(await resolvedList);
      setModelParamReaction(await response.data);
    } catch (error) {
      console.error(error);
    }
    setShowListReaction(false);
  };

  const handleParamActionChange = (
    event: string | number | boolean,
    nameParam: string,
  ) => {
    const updatedList = listParamAction.map(param => {
      if (param.nameParam === nameParam) {
        return {
          ...param,
          param: event,
        };
      }
      return param;
    });
    setListParamAction(updatedList);
  };

  const handleParamReactionChange = (event: string, nameParam: string) => {
    const updatedList = listParamReaction.map(param => {
      if (param.nameParam === nameParam) {
        return {
          ...param,
          param: event,
        };
      }
      return param;
    });
    setListParamReaction(updatedList);
  };

  const handleCallActionList = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/' + token + '/actions')
      .then(response => {
        setListAction((prevState: string[] | undefined) => {
          const newActions = response.data.map(
            (item: {name: string}) => item.name,
          );
          const uniqueActions = new Set([...(prevState || []), ...newActions]);
          return Array.from(uniqueActions);
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCallReactionList = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/' + token + '/reactions')
      .then(response => {
        setListReaction((prevState: string[] | undefined) => {
          const newActions = response.data.map(
            (item: {name: string}) => item.name,
          );
          const uniqueActions = new Set([...(prevState || []), ...newActions]);
          return Array.from(uniqueActions);
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCreateArea = () => {
    for (var i = 0; i < listParamAction.length; i++) {
      if (listParamAction[i].typeParam === 'number') {
        modelParamAction[listParamAction[i].nameParam] = Number(
          listParamAction[i].param,
        );
      } else {
        modelParamAction[listParamAction[i].nameParam] =
          listParamAction[i].param;
      }
    }
    for (var y = 0; y < listParamReaction.length; y++) {
      if (listParamReaction[y].typeParam === 'number') {
        modelParamReaction[listParamReaction[y].nameParam] = Number(
          listParamReaction[y].param,
        );
      } else {
        modelParamReaction[listParamReaction[y].nameParam] =
          listParamReaction[y].param;
      }
    }

    const data = {
      nameArea: nameArea,
      nameAction: selectedAction,
      actionParameter: modelParamAction,
      nameReaction: selectedReaction,
      reactionParameter: modelParamReaction,
    };
    axios
      .post(process.env.REACT_APP_SERVER_URL + '/' + token + '/areas', data)
      .then(() => {})
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleCallActionList();
    handleCallReactionList();
  }, []);

  return (
    <View style={styles.addComponent}>
      <View style={styles.addComponentBody}>
        <Text style={styles.addComponentTitle}>Create Area</Text>
        <TextInput
          style={styles.addComponentNameInput}
          onChangeText={handleNameAreaChange}
          value={nameArea}
          placeholder="Area name"
          inputMode="text"
        />
        <View>
          <Pressable
            onPress={handleClickActionList}
            style={styles.addComponentActionInput}>
            <Text style={styles.addComponentActionTitle}>{selectedAction}</Text>
            <View style={styles.addComponentActionLine} />
            <Image
              style={styles.addComponentActionButton}
              source={require('../../assets/SelectInput.png')}
            />
          </Pressable>
          {showlistAction && (
            <FlatList
              style={styles.addComponentActionListArea}
              data={listAction}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.addComponentActionList}
                  onPress={() => handleActionAreaChange(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        {listParamAction && (
          <FlatList
            data={listParamAction}
            style={styles.addComponentParamArea}
            keyExtractor={item => item.nameParam}
            renderItem={({item}) => (
              <View key={item.nameParam}>
                {item.typeParam === 'string' && (
                  <TextInput
                    style={styles.addComponentParamInput}
                    value={item.param}
                    onChangeText={text =>
                      handleParamActionChange(text, item.nameParam)
                    }
                    placeholder={item.nameParam}
                    inputMode="text"
                  />
                )}
                {item.typeParam === 'number' && (
                  <TextInput
                    style={styles.addComponentParamInput}
                    value={item.param}
                    onChangeText={text =>
                      handleParamActionChange(text, item.nameParam)
                    }
                    keyboardType="numeric"
                    placeholder={item.nameParam}
                    inputMode="numeric"
                  />
                )}
                {item.typeParam === 'boolean' && (
                  <Switch
                    value={item.param}
                    onValueChange={value =>
                      handleParamActionChange(value, item.nameParam)
                    }
                  />
                )}
              </View>
            )}
          />
        )}
        <View>
          <Pressable
            onPress={handleClickReactionList}
            style={styles.addComponentReactionInput}>
            <Text style={styles.addComponentReactionTitle}>
              {selectedReaction}
            </Text>
            <View style={styles.addComponentReactionLine} />
            <Image
              style={styles.addComponentReactionButton}
              source={require('../../assets/SelectInput.png')}
            />
          </Pressable>
          {showlistReaction && (
            <FlatList
              style={styles.addComponentReactionListArea}
              data={listReaction}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.addComponentReactionList}
                  onPress={() => handleReactionAreaChange(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        {listParamReaction && (
          <FlatList
            data={listParamReaction}
            style={styles.addComponentParamArea}
            keyExtractor={item => item.nameParam}
            renderItem={({item}) => (
              <TextInput
                key={item.nameParam}
                style={styles.addComponentParamInput}
                onChangeText={text =>
                  handleParamReactionChange(text, item.nameParam)
                }
                value={item.param}
                placeholder={item.nameParam}
              />
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.addComponentButton}
        onPress={handleCreateArea}>
        <Text style={styles.addComponentButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddComponent;

const styles = StyleSheet.create({
  addComponent: {
    display: 'flex',
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addComponentBody: {
    width: 325,
    height: '90%',
    backgroundColor: '#C7C4DC',
    borderRadius: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  addComponentTitle: {
    fontSize: 32,
    color: '#000',
    marginTop: 15,
  },
  addComponentNameInput: {
    marginTop: 10,
    height: 50,
    width: 280,
    backgroundColor: '#C5C0FF',
    borderWidth: 2,
    borderColor: '#423B8E',
    borderRadius: 16,
    color: '#2B2277',
    fontSize: 12,
    paddingLeft: 18,
  },
  addComponentActionInput: {
    marginTop: 30,
    marginBottom: 0,
    width: 300,
    height: 62,
    borderRadius: 16,
    backgroundColor: '#464559',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addComponentActionTitle: {
    flexGrow: 1,
    color: 'white',
    textAlign: 'center',
    marginRight: -45,
  },
  addComponentActionLine: {
    width: 1,
    height: 62,
    backgroundColor: '#000',
  },
  addComponentActionButton: {
    marginHorizontal: 10,
  },
  addComponentActionListArea: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    width: '50%',
    borderWidth: 1,
    borderColor: '#000',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    marginTop: 30,
    //width: 175???
  },
  addComponentActionList: {
    marginTop: 10,
  },
  addComponentReactionInput: {
    marginTop: 0,
    marginBottom: 30,
    width: 300,
    height: 62,
    borderRadius: 16,
    backgroundColor: '#464559',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addComponentReactionTitle: {
    flexGrow: 1,
    textAlign: 'center',
    marginRight: -45,
    color: 'white',
  },
  addComponentReactionLine: {
    width: 1,
    height: 62,
    backgroundColor: '#000',
  },
  addComponentReactionButton: {
    marginRight: 10,
    marginLeft: 10,
  },
  addComponentReactionListArea: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    width: '50%',
    borderWidth: 1,
    borderColor: '#000',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 50,
  },
  addComponentReactionList: {
    marginTop: 10,
  },
  addComponentParamArea: {
    marginTop: 30,
    marginBottom: 10,
  },
  addComponentParamInput: {
    marginTop: 15,
    height: 35,
    width: 250,
    backgroundColor: '#C5C0FF',
    borderWidth: 2,
    borderColor: '#423B8E',
    borderRadius: 16,
    color: '#2B2277',
    fontSize: 12,
    paddingLeft: 18,
  },
  addComponentButton: {
    marginTop: 25,
    borderRadius: 16,
    backgroundColor: '#464559',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 222,
    height: 47,
  },
  addComponentButtonText: {
    color: '#E4DFF9',
    fontSize: 20,
    fontWeight: '400',
  },
});
