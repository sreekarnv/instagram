import { useMeQuery } from '../graphql/generated';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreenProps } from '../navigation/AuthNavigator';
import Box from '../components/Box';
import Text from '../components/Text';
import theme from '../config/theme';

const Home: React.FC<AuthScreenProps> = () => {
	const { data } = useMeQuery();
	// const [logout, { loading }] = useLogoutMutation();

	return (
		<>
			<SafeAreaView
				style={{
					backgroundColor: theme.colors.dark,
					flex: 1,
					paddingHorizontal: 20,
					paddingVertical: 10,
				}}>
				<Box marginBottom={'md'}>
					<Text color='light' fontSize={30}>
						Feed
					</Text>
				</Box>
				<View>{data && <Text>{JSON.stringify(data, null, 4)}</Text>}</View>
				{/* <Button
					title={loading ? 'Loading...' : 'Logout'}
					onPress={() => {
						return logout({
							update: async (cache) => {
								await cache.reset();
								navigation.navigate('Login');
							},
						});
					}}
				/> */}
			</SafeAreaView>
		</>
	);
};

export default Home;
