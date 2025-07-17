import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, RichText } from '@wordpress/block-editor';
import { ToolbarGroup, DropdownMenu, MenuGroup, MenuItem, Spinner, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import {chevronDown, home, info, comment, formatIndent} from "@wordpress/icons";

export default function Edit({ attributes, setAttributes }) {
	const { content } = attributes;
	const [isLoading, setIsLoading] = useState(false);
	const [loadingKey, setLoadingKey] = useState(null);

	const AIPROVIDERS = [
		{ title: 'Robot', content: "Lorem", icon: home},
		{ title: 'Brain', content: 'Lorem Ipsum is simply dummy text of the printing ', icon: info },
		{ title: 'Microchip', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", icon: comment },
		{ title: 'Network Wired', content: 'Lorem Ipsum', icon: formatIndent }
	];

	const aiMenuControls = AIPROVIDERS.map(({title, content, icon}) => ({
		title,
		icon,
		onClick: () => {
			if (!isLoading) {
				handleLoading(content)
			}
		},
		isDisabled: isLoading,
	}))

	const handleLoading = (content, key) => {
		setIsLoading(true);
		setLoadingKey(key);

		setTimeout(() => {
			setIsLoading(false);
			setLoadingKey(null);
			setAttributes({ content });
		}, 2000);
	};

	return (
		<div {...useBlockProps()}>
			<BlockControls>
				<ToolbarGroup>
					<DropdownMenu icon={chevronDown} label="AI Assistant">
						{() => (
							<MenuGroup>
								{AIPROVIDERS.map(({ title, content, icon }) => (
									<MenuItem
										key={title}
										disabled={isLoading}
										onClick={() => {
											handleLoading(content, title);
										}}
									>
										{loadingKey === title && isLoading ? (
											<Spinner />
										) : (
											<Icon icon={icon} />
										)}
										{title}
									</MenuItem>
								))}
							</MenuGroup>
						)}
					</DropdownMenu>
				</ToolbarGroup>
			</BlockControls>
			<RichText
				tagName="p"
				value={content}
				onChange={(newContent) => setAttributes({ content: newContent })}
			/>
		</div>
	);
}
