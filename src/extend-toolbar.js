import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import {ToolbarGroup, ToolbarButton} from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins'
import {arrowDown} from "@wordpress/icons";
import { useDispatch } from '@wordpress/data';

const withNativeToolbarButton = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const {name, isSelected, attributes, setAttributes, clientId} = props;

		if (name !== 'core/paragraph') {
			return  <BlockEdit {...props}/>
		}

		const { updateBlockAttributes } = useDispatch('core/block-editor');

		const addText = () => {
			const newContent = (attributes.content || '') + 'Hello World' + ' ';

			updateBlockAttributes(clientId, {content: newContent})
		}
		return (
			<>
				<BlockEdit {...props}/>
				{isSelected && (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								onClick={addText}
								label="Click"
								icon={arrowDown}
							/>
						</ToolbarGroup>
					</BlockControls>
				)}
			</>
		)
	},
	'withNativeToolbarButton'
)

addFilter(
	'editor.BlockEdit',
	'native-blocks',
	withNativeToolbarButton
);

registerPlugin('native-blocks-paragraph-toolbar', {
	render: () => withNativeToolbarButton,
});
