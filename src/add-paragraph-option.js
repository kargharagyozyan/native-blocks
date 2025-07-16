import { BlockSettingsMenuControls } from '@wordpress/block-editor';
import { MenuItem } from '@wordpress/components';
import { useDispatch, useSelect } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";

const ParagraphMenuAddon = () => {
	// Get the selected block, its clientId and attributes
	const { selectedBlock, clientId, attributes } = useSelect((select) => {
		const block = select('core/block-editor').getSelectedBlock();
		return {
			selectedBlock: block,
			clientId: block ? block.clientId : null,
			attributes: block ? block.attributes : {},
		};
	}, []);

	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const isParagraph = selectedBlock?.name === 'core/paragraph';

	const onClickSelectAll = (onClose) => {
		const newContent = (attributes.content || '') + 'Hello World' + ' ';

		updateBlockAttributes(clientId, { content: newContent });
		onClose();
	};

	if (!isParagraph) return null;

	return (
		<BlockSettingsMenuControls>
			{({ onClose }) => (
				<MenuItem
					onClick={() => {
						onClickSelectAll(onClose);
					}}
				>
					Select alle
				</MenuItem>
			)}
		</BlockSettingsMenuControls>
	);
};

registerPlugin('custom-paragraph-menu', {
	render: ParagraphMenuAddon,
});
