import { useLogoutMutation, useMeQuery } from '../graphql/generated';
import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { AuthScreenProps } from '../navigation/AuthNavigator';

const Home: React.FC<AuthScreenProps> = ({ navigation }) => {
	const { data } = useMeQuery();
	const [logout, { loading }] = useLogoutMutation();

	return (
		<>
			<SafeAreaView>
				<View>{data && <Text>{JSON.stringify(data, null, 4)}</Text>}</View>
				<Button
					title={loading ? 'Loading...' : 'Logout'}
					onPress={() => {
						return logout({
							update: async (cache) => {
								await cache.reset();
								navigation.navigate('Login');
							},
						});
					}}
				/>
			</SafeAreaView>
		</>
	);
};

export default Home;
