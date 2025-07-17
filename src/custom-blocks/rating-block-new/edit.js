import { useBlockProps, BlockControls, PlainText } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';
import {chevronDown, home, info, comment, formatIndent} from "@wordpress/icons";

export default function Edit({ attributes, setAttributes }) {
	const { content = "Hello" } = attributes;
	const [isLoading, setIsLoading] = useState(false);
	const [loadingTitle, setLoadingTitle] = useState(null);

	const AIPROVIDERS = [
		{ title: 'Robot', content: "Lorem", icon: home},
		{ title: 'Brain', content: 'Lorem Ipsum is simply dummy text of the printing ', icon: info },
		{ title: 'Microchip', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", icon: comment },
		{ title: 'Network Wired', content: 'Lorem Ipsum', icon: formatIndent }
	];

	const aiMenuControls = AIPROVIDERS.map(({title, content, icon}) => ({
		title,
		icon: isLoading && loadingTitle === title ? <Spinner /> : icon,
		onClick: () => {
			if (!isLoading) {
				handleLoading(title, content)
			}
		},
		isDisabled: isLoading,
	}))

	const handleLoading = (title, content) => {
		setIsLoading(true);
		setLoadingTitle(title)

		setTimeout(() => {
			setIsLoading(false);
			setLoadingTitle(null)
			setAttributes({ content });
		}, 2000);
	};

	return (
		<>
			<BlockControls>
				<ToolbarDropdownMenu
					icon={chevronDown}
					label="AI Assistant"
					controls={aiMenuControls}
					disabled={isLoading}
				>
				</ToolbarDropdownMenu>
			</BlockControls>
			<div { ...useBlockProps() }>
				<PlainText
					value={content}
					onChange={(newContent) => setAttributes({ content: newContent })}
					disabled={isLoading}
					placeholder="Start typing here..."
				/>
			</div>
		</>
	);
}
