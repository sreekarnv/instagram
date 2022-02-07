import React from 'react';
import Avatar from '../../shared/components/ui/Avatar';
import Box from '../../shared/components/ui/Box';
import Constants from 'expo-constants';
import Text from '../../shared/components/ui/Text';
import { TouchableOpacity } from 'react-native';
import { RegistrationScreenProp } from './types';
import { useTheme } from '@shopify/restyle';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../../config/theme';

interface SelectAvatarScreenProps
	extends RegistrationScreenProp<'SelectAvatar'> {}

const SelectAvatarScreen: React.FC<SelectAvatarScreenProps> = ({
	navigation,
}) => {
	const theme = useTheme<Theme>();
	const [selected, setSelected] = React.useState<number>(1);

	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('Details', {
								avatar: selected,
							})
						}
						style={{
							padding: 8,
							borderRadius: 200,
						}}>
						<Feather
							style={{ color: theme.colors.secondary }}
							name='send'
							size={20}
						/>
					</TouchableOpacity>
				);
			},
		});
	}, [selected]);

	return (
		<>
			<Box p='m' flexDirection={'row'} flexWrap={'wrap'} alignItems={'center'}>
				{Array(4)
					.fill(0)
					.map((_, i) => (
						<Box alignItems={'center'} mb='xl' width={'50%'} key={i}>
							<TouchableOpacity onPress={() => setSelected(i + 1)}>
								<Box
									borderWidth={4}
									borderColor={selected === i + 1 ? 'primary' : 'transparent'}
									borderRadius={200}
									padding={'s'}>
									<Avatar
										source={`${
											Constants.manifest?.extra?.SERVER_URL
										}/uploads/avatars/avatar-${i + 1}.png`}
									/>
								</Box>
								<Box mt='s'>
									<Text textAlign='center' variant='label'>
										Avatar {i + 1}
									</Text>
								</Box>
							</TouchableOpacity>
						</Box>
					))}
			</Box>

			<Box mt='xl' alignItems={'center'} justifyContent={'center'}>
				<Text textAlign='center' variant='title3'>
					Currently Selected
				</Text>
				<Text textAlign='center' color='secondary' variant='title2'>
					Avatar {selected}
				</Text>
			</Box>
		</>
	);
};

export default SelectAvatarScreen;
