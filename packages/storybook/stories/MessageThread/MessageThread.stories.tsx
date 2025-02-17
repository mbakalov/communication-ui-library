// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MessageProps,
  MessageThread as MessageThreadComponent,
  ChatMessage,
  CustomMessage,
  SystemMessage,
  MessageRenderer,
  FileMetadata,
  AttachmentDownloadResult,
  ImageGalleryImageProps,
  ImageGallery
} from '@azure/communication-react';
import {
  Persona,
  PersonaPresence,
  PersonaSize,
  PrimaryButton,
  Stack,
  Dropdown,
  IDropdownOption
} from '@fluentui/react';
import { Divider } from '@fluentui/react-components';
import { Canvas, Description, Heading, Props, Source, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react/types-6-0';
import React, { useEffect, useRef, useState } from 'react';
import { DetailedBetaBanner } from '../BetaBanners/DetailedBetaBanner';
import { SingleLineBetaBanner } from '../BetaBanners/SingleLineBetaBanner';

import { COMPONENT_FOLDER_PREFIX } from '../constants';
import { controlsToAdd, hiddenControl } from '../controlsUtils';
import {
  GenerateMockNewChatMessage,
  UserOne,
  GenerateMockNewChatMessageFromOthers,
  GenerateMockHistoryChatMessages,
  GenerateMockChatMessages,
  MessageThreadStoryContainerStyles,
  GenerateMockSystemMessage,
  GenerateMockCustomMessage,
  GetAvatarUrlByUserId,
  GenerateMockNewChatMessageWithInlineImage,
  GenerateMockNewChatMessageWithMention
} from './placeholdermessages';
import { MessageThreadWithBlockedMessagesExample } from './snippets/BlockedMessages.snippet';
import { MessageThreadWithCustomAvatarExample } from './snippets/CustomAvatar.snippet';
import { MessageThreadWithCustoBlockedmMessageContainerExample } from './snippets/CustomBlockedMessage.snippet';
import { MessageThreadWithCustomChatContainerExample } from './snippets/CustomChatContainer.snippet';
import { MessageThreadWithCustomMessageContainerExample } from './snippets/CustomMessageContainer.snippet';
import { MessageThreadWithCustomMessagesExample } from './snippets/CustomMessages.snippet';
import { MessageThreadWithCustomMessageStatusIndicatorExample } from './snippets/CustomMessageStatusIndicator.snippet';
import { MessageThreadWithCustomTimestampExample } from './snippets/CustomTimestamp.snippet';
import { DefaultMessageThreadExample } from './snippets/Default.snippet';
import { MessageThreadWithMessageStatusIndicatorExample } from './snippets/MessageStatusIndicator.snippet';
import { MessageWithCustomMentionRenderer } from './snippets/MessageWithCustomMentionRenderer.snippet';
import { MessageWithFile } from './snippets/MessageWithFile.snippet';
import { MessageThreadWithSystemMessagesExample } from './snippets/SystemMessages.snippet';
import { MessageThreadWithInlineImageExample } from './snippets/WithInlineImageMessage.snippet';
import { MessageThreadWithMessageDateExample } from './snippets/WithMessageDate.snippet';

const MessageThreadWithBlockedMessagesExampleText =
  require('!!raw-loader!./snippets/BlockedMessages.snippet.tsx').default;
const MessageThreadWithCustomAvatarExampleText = require('!!raw-loader!./snippets/CustomAvatar.snippet.tsx').default;
const MessageThreadWithCustoBlockedmMessageContainerExampleText =
  require('!!raw-loader!./snippets/CustomBlockedMessage.snippet.tsx').default;
const MessageThreadWithCustomChatContainerExampleText =
  require('!!raw-loader!./snippets/CustomChatContainer.snippet.tsx').default;
const MessageThreadWithCustomMessageContainerExampleText =
  require('!!raw-loader!./snippets/CustomMessageContainer.snippet.tsx').default;
const MessageThreadWithCustomMessagesExampleText =
  require('!!raw-loader!./snippets/CustomMessages.snippet.tsx').default;
const MessageThreadWithCustomMessageStatusIndicatorExampleText =
  require('!!raw-loader!./snippets/CustomMessageStatusIndicator.snippet.tsx').default;
const MessageThreadWithCustomTimestampExampleText =
  require('!!raw-loader!./snippets/CustomTimestamp.snippet.tsx').default;
const DefaultMessageThreadExampleText = require('!!raw-loader!./snippets/Default.snippet.tsx').default;
const MessageThreadWithMessageStatusIndicatorExampleText =
  require('!!raw-loader!./snippets/MessageStatusIndicator.snippet.tsx').default;
const MessageWithCustomMentionRendererText =
  require('!!raw-loader!./snippets/MessageWithCustomMentionRenderer.snippet.tsx').default;
const MessageWithFileText = require('!!raw-loader!./snippets/MessageWithFile.snippet.tsx').default;
const ExampleConstantsText = require('!!raw-loader!./snippets/placeholdermessages.ts').default;
const MessageThreadWithSystemMessagesExampleText =
  require('!!raw-loader!./snippets/SystemMessages.snippet.tsx').default;
const MessageThreadWithInlineImageExampleText =
  require('!!raw-loader!./snippets/WithInlineImageMessage.snippet.tsx').default;
const MessageThreadWithMessageDateExampleText = require('!!raw-loader!./snippets/WithMessageDate.snippet.tsx').default;

const importStatement = `
import { FluentThemeProvider, MessageThread } from '@azure/communication-react';
`;

const mentionTag = `
<msft-mention id="<id>">
  Displayable Text
</msft-mention>
`;
const Docs: () => JSX.Element = () => {
  const refDefaultMessageThread = useRef(null);
  const refWithMessageDate = useRef(null);
  const refSystemMessage = useRef(null);
  const refBlockedMessage = useRef(null);
  const refCustomMessage = useRef(null);
  const refWithCustomizedChatContainer = useRef(null);
  const refWithCustomizedMessageContainer = useRef(null);
  const refWithCustomizedBlockedMessageContainer = useRef(null);
  const refDefaultMessageWithStatusIndicator = useRef(null);
  const refCustomMessageWithStatusIndicator = useRef(null);
  const refCustomAvatar = useRef(null);
  const refCustomTimestamp = useRef(null);
  const refDisplayInlineImages = useRef(null);
  const refDisplayFileAttachments = useRef(null);
  const refMentionOfUsers = useRef(null);
  const refProps = useRef(null);

  const scrollToRef = (ref): void => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    const url = window.top ? window.top.location.href : window.location.href;
    if (url.includes('default-messagethread') && refDefaultMessageThread.current) {
      scrollToRef(refDefaultMessageThread);
    } else if (url.includes('messagethread-with-message-date') && refWithMessageDate.current) {
      scrollToRef(refWithMessageDate);
    } else if (url.includes('system-message') && refSystemMessage.current) {
      scrollToRef(refSystemMessage);
    } else if (
      url.includes('messages-with-customized-blocked-message-container') &&
      refWithCustomizedBlockedMessageContainer.current
    ) {
      scrollToRef(refWithCustomizedBlockedMessageContainer);
    } else if (url.includes('blocked-message') && refBlockedMessage.current) {
      scrollToRef(refBlockedMessage);
    } else if (url.includes('custom-message-status-indicator') && refCustomMessageWithStatusIndicator.current) {
      scrollToRef(refCustomMessageWithStatusIndicator);
    } else if (url.includes('custom-message') && refCustomMessage.current) {
      scrollToRef(refCustomMessage);
    } else if (url.includes('messages-with-customized-chat-container') && refWithCustomizedChatContainer.current) {
      scrollToRef(refWithCustomizedChatContainer);
    } else if (
      url.includes('messages-with-customized-message-container') &&
      refWithCustomizedMessageContainer.current
    ) {
      scrollToRef(refWithCustomizedMessageContainer);
    } else if (url.includes('default-message-status-indicator') && refDefaultMessageWithStatusIndicator.current) {
      scrollToRef(refDefaultMessageWithStatusIndicator);
    } else if (url.includes('custom-avatar') && refCustomAvatar.current) {
      scrollToRef(refCustomAvatar);
    } else if (url.includes('custom-timestamp') && refCustomTimestamp.current) {
      scrollToRef(refCustomTimestamp);
    } else if (url.includes('display-inline-image-with-messages') && refDisplayInlineImages.current) {
      scrollToRef(refDisplayInlineImages);
    } else if (url.includes('display-file-attachments-with-messages') && refDisplayFileAttachments.current) {
      scrollToRef(refDisplayFileAttachments);
    } else if (url.includes('mention-of-users-with-a-custom-renderer-within-messages') && refMentionOfUsers.current) {
      scrollToRef(refMentionOfUsers);
    } else if (url.includes('props') && refProps.current) {
      scrollToRef(refProps);
    }
  }, [
    refDefaultMessageThread,
    refWithMessageDate,
    refSystemMessage,
    refWithCustomizedBlockedMessageContainer,
    refBlockedMessage,
    refCustomMessageWithStatusIndicator,
    refCustomMessage,
    refWithCustomizedChatContainer,
    refWithCustomizedMessageContainer,
    refDefaultMessageWithStatusIndicator,
    refCustomAvatar,
    refCustomTimestamp,
    refDisplayInlineImages,
    refDisplayFileAttachments,
    refMentionOfUsers,
    refProps
  ]);
  return (
    <>
      <Title>MessageThread</Title>
      <Description>
        MessageThread allows you to easily create a component for rendering chat messages, handling scrolling behavior
        of new/old messages and customizing icons &amp; controls inside the chat thread.
      </Description>
      <Description>
        MessageThread internally uses the `Chat` &amp; `ChatMessage` components from `@fluentui-contrib/chat`. You can
        checkout the details about these components
        [here](https://microsoft.github.io/fluentui-contrib/react-chat/?path=/story/chat--default).
      </Description>

      <Heading>Importing</Heading>
      <Source code={importStatement} />

      <Heading>Sample Messages</Heading>
      <Description>
        Create a `placeholdermessages.ts` file in the current folder you are working on. Then copy paste the code below
        into that file.
      </Description>
      <Source code={ExampleConstantsText} />

      <div ref={refDefaultMessageThread}>
        <Heading>Default MessageThread</Heading>
        <Description>
          By default, MessageThread displays Chat messages with display name of only for other users and creation time
          of message when available.
        </Description>
        <Canvas mdxSource={DefaultMessageThreadExampleText}>
          <DefaultMessageThreadExample />
        </Canvas>
      </div>

      <div ref={refWithMessageDate}>
        <Heading>MessageThread With Message Date</Heading>
        <Canvas mdxSource={MessageThreadWithMessageDateExampleText}>
          <MessageThreadWithMessageDateExample />
        </Canvas>
      </div>

      <div ref={refSystemMessage}>
        <Heading>System Message</Heading>
        <Description>The example below shows a message thread with a system message.</Description>
        <Canvas mdxSource={MessageThreadWithSystemMessagesExampleText}>
          <MessageThreadWithSystemMessagesExample />
        </Canvas>
      </div>

      <div ref={refBlockedMessage}>
        <Heading>Blocked Message</Heading>
        <SingleLineBetaBanner />
        <Description>
          The example below shows a message thread with a blocked message. If `link` is not provided, it will omit the
          hyperlink.
        </Description>
        <Canvas mdxSource={MessageThreadWithBlockedMessagesExampleText}>
          <MessageThreadWithBlockedMessagesExample />
        </Canvas>
      </div>

      <div ref={refCustomMessage}>
        <Heading>Custom Message</Heading>
        <Description>
          The example below shows how to render a `custom` message with `onRenderMessage` in `MessageThread`
        </Description>
        <Canvas mdxSource={MessageThreadWithCustomMessagesExampleText}>
          <MessageThreadWithCustomMessagesExample />
        </Canvas>
      </div>

      <div ref={refWithCustomizedChatContainer}>
        <Heading>Messages with Customized Chat Container</Heading>
        <Description>
          The example below shows how to render a `custom` chat container with `styles.chatContainer` in `MessageThread`
        </Description>
        <Canvas mdxSource={MessageThreadWithCustomChatContainerExampleText}>
          <MessageThreadWithCustomChatContainerExample />
        </Canvas>
      </div>

      <div ref={refWithCustomizedMessageContainer}>
        <Heading>Messages with Customized Message Container</Heading>
        <Description>
          The example below shows how to render a `custom` message container with `styles.chatMessageContainer` or
          `styles.systemMessageContainer` in `MessageThread`
        </Description>
        <Description>
          Note: In the code example, all `%` characters were replaced by their unicode value `\u0025` due to URI
          malformed issue when loading the storybook snippets
        </Description>
        <Canvas mdxSource={MessageThreadWithCustomMessageContainerExampleText}>
          <MessageThreadWithCustomMessageContainerExample />
        </Canvas>
      </div>

      <div ref={refWithCustomizedBlockedMessageContainer}>
        <Heading>Messages with Customized Blocked message Container</Heading>
        <SingleLineBetaBanner />
        <Description>
          The example below shows how to render a `blocked` message with custom `warningText`, with
          `styles.blockedMessageContainer` for styling, and rendering your own JSX.Element with with `onRenderMessage`
          in `MessageThread`
        </Description>
        <Canvas mdxSource={MessageThreadWithCustoBlockedmMessageContainerExampleText}>
          <MessageThreadWithCustoBlockedmMessageContainerExample />
        </Canvas>
      </div>

      <div ref={refDefaultMessageWithStatusIndicator}>
        <Heading>Default Message Status Indicator</Heading>
        <Canvas mdxSource={MessageThreadWithMessageStatusIndicatorExampleText}>
          <MessageThreadWithMessageStatusIndicatorExample />
        </Canvas>
      </div>

      <div ref={refCustomMessageWithStatusIndicator}>
        <Heading>Custom Message Status Indicator</Heading>
        <Description>
          The example below shows how to render a `custom` message status indicator with `onRenderMessageStatus` in
          `MessageThread`
        </Description>
        <Canvas mdxSource={MessageThreadWithCustomMessageStatusIndicatorExampleText}>
          <MessageThreadWithCustomMessageStatusIndicatorExample />
        </Canvas>
      </div>

      <div ref={refCustomAvatar}>
        <Heading>Custom Avatar</Heading>
        <Canvas mdxSource={MessageThreadWithCustomAvatarExampleText}>
          <MessageThreadWithCustomAvatarExample />
        </Canvas>
        <Description>
          Note: You can view the details of the
          [Persona](https://developer.microsoft.com/fluentui#/controls/web/persona) component
        </Description>
      </div>

      <div ref={refCustomTimestamp}>
        <Heading>Custom Timestamp</Heading>
        <SingleLineBetaBanner />
        <Canvas mdxSource={MessageThreadWithCustomTimestampExampleText}>
          <MessageThreadWithCustomTimestampExample />
        </Canvas>
      </div>

      <div ref={refDisplayInlineImages}>
        <Heading>Display Inline Image with Messages</Heading>
        <SingleLineBetaBanner />
        <Description>
          MessageThread component provides UI for displaying inline image attachments in a message. If an image is
          protected by header-based authentication, developers can write there own HTTP call to get the image so you can
          provide the applicable headers. By default the `previewUrl` is displayed in the message bubble.
        </Description>
        <Canvas mdxSource={MessageThreadWithInlineImageExampleText}>
          <MessageThreadWithInlineImageExample />
        </Canvas>
      </div>

      <div ref={refDisplayFileAttachments}>
        <Heading>Display File Attachments with Messages</Heading>
        <DetailedBetaBanner />
        <Description>
          MessageThread component provides UI for displaying file attachments in a message. This allows developers to
          implement a file sharing feature using the pure UI component with minimal effort. Developers can write their
          own file download logic and utilize the UI provided by MessageThread. Clicking on the file attachment opens it
          in a new browser tab. Developers can override this behavior as well using MessageThread props.
        </Description>
        <Canvas mdxSource={MessageWithFileText}>
          <MessageWithFile />
        </Canvas>
      </div>

      <div ref={refMentionOfUsers}>
        <Heading>Mention of Users with a custom renderer within Messages</Heading>
        <SingleLineBetaBanner version={'1.7.0-beta.1'} />
        <Description>
          When a user is mentioned in a message, a custom HTML tag is used to represent the element in the
          MessageThread. This element can be styled using the standard methods and the renderer can be overridden for
          further customization. The HTML Tag is defined:
        </Description>
        <Source code={mentionTag} />
        <Canvas mdxSource={MessageWithCustomMentionRendererText}>
          <MessageWithCustomMentionRenderer />
        </Canvas>
      </div>

      <div ref={refProps}>
        <Heading>Props</Heading>
        <Props of={MessageThreadComponent} />
      </div>
    </>
  );
};

const MessageThreadStory = (args): JSX.Element => {
  const [chatMessages, setChatMessages] = useState<(SystemMessage | CustomMessage | ChatMessage)[]>(
    GenerateMockChatMessages()
  );
  const dropdownMenuOptions = [
    { key: 'newMessage', text: 'New Message' },
    { key: 'newMessageOthers', text: 'New Message from others' },
    { key: 'newMessageWithInlineImage', text: 'New Message with Inline Image' },
    { key: 'newMessageWithMention', text: 'New Message with Mention' },
    { key: 'newSystemMessage', text: 'New System Message' },
    { key: 'newCustomMessage', text: 'New Custom Message' }
  ];

  const [selectedMessageType, setSelectedMessageType] = useState<IDropdownOption>(dropdownMenuOptions[0]);
  // Property for checking if the history messages are loaded
  const loadedHistoryMessages = useRef(false);

  const onSendNewMessage = (): void => {
    const existingChatMessages = chatMessages;
    // We don't want to render the status for previous messages
    existingChatMessages.forEach((message) => {
      if (message.messageType === 'chat') {
        message.status = 'seen';
      }
    });
    setChatMessages([...existingChatMessages, GenerateMockNewChatMessage()]);
  };

  const onSendNewMessageFromOthers = (): void => {
    setChatMessages([...chatMessages, GenerateMockNewChatMessageFromOthers()]);
  };

  const onSendNewMessageWithInlineImage = (): void => {
    setChatMessages([...chatMessages, GenerateMockNewChatMessageWithInlineImage()]);
  };

  const onSendNewMessageWithMention = (): void => {
    setChatMessages([...chatMessages, GenerateMockNewChatMessageWithMention()]);
  };

  const onLoadPreviousMessages = async (): Promise<boolean> => {
    if (!loadedHistoryMessages.current) {
      loadedHistoryMessages.current = true;
      setChatMessages([...GenerateMockHistoryChatMessages(), ...chatMessages]);
    }
    return Promise.resolve(true);
  };

  const onSendNewSystemMessage = (): void => {
    setChatMessages([...chatMessages, GenerateMockSystemMessage()]);
  };

  const onSendCustomMessage = (): void => {
    setChatMessages([...chatMessages, GenerateMockCustomMessage()]);
  };

  const onRenderMessage = (messageProps: MessageProps, defaultOnRender?: MessageRenderer): JSX.Element => {
    if (messageProps.message.messageType === 'custom') {
      return <Divider appearance="brand">{messageProps.message.content}</Divider>;
    }

    return defaultOnRender ? defaultOnRender(messageProps) : <></>;
  };

  const onUpdateMessageCallback = (messageId, content): Promise<void> => {
    const updatedChatMessages = chatMessages;
    const msgIdx = chatMessages.findIndex((m) => m.messageId === messageId);
    const message = chatMessages[msgIdx];
    if (message.messageType === 'chat') {
      message.content = content;
      message.editedOn = new Date(Date.now());
    }
    updatedChatMessages[msgIdx] = message;
    setChatMessages(updatedChatMessages);
    return Promise.resolve();
  };

  const onFetchAttachment = async (attachment: FileMetadata): Promise<AttachmentDownloadResult[]> => {
    // Mocking promise
    const delay = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 3000));
    return await delay().then(() => {
      return [
        {
          blobUrl: attachment.previewUrl ?? ''
        }
      ];
    });
  };
  const [galleryImages, setGalleryImages] = useState<Array<ImageGalleryImageProps>>([]);

  const onInlineImageClicked = (attachmentId: string, messageId: string): Promise<void> => {
    const messages = chatMessages?.filter((message) => {
      return message.messageId === messageId;
    });
    if (!messages || messages.length <= 0) {
      return Promise.reject(`Message not found with messageId ${messageId}`);
    }
    const chatMessage = messages[0] as ChatMessage;

    const attachments = chatMessage.attachedFilesMetadata?.filter((attachment) => {
      return attachment.id === attachmentId;
    });

    if (!attachments || attachments.length <= 0) {
      return Promise.reject(`Attachment not found with id ${attachmentId}`);
    }

    const attachment = attachments[0];
    attachment.name = chatMessage.senderDisplayName || '';
    const title = 'Message Thread Image';
    const titleIcon = (
      <Persona text={chatMessage.senderDisplayName} size={PersonaSize.size32} hidePersonaDetails={true} />
    );
    const galleryImage: ImageGalleryImageProps = {
      title,
      titleIcon,
      downloadFilename: attachment.id,
      imageUrl: attachment.url
    };
    setGalleryImages([galleryImage]);
    return Promise.resolve();
  };

  const onSendHandler = (): void => {
    switch (selectedMessageType.key) {
      case 'newMessage':
        onSendNewMessage();
        break;
      case 'newMessageOthers':
        onSendNewMessageFromOthers();
        break;
      case 'newMessageWithInlineImage':
        onSendNewMessageWithInlineImage();
        break;
      case 'newMessageWithMention':
        onSendNewMessageWithMention();
        break;
      case 'newSystemMessage':
        onSendNewSystemMessage();
        break;
      case 'newCustomMessage':
        onSendCustomMessage();
        break;
      default:
        console.log('Invalid message type');
    }
  };
  return (
    <Stack verticalFill style={MessageThreadStoryContainerStyles} tokens={{ childrenGap: '1rem' }}>
      <MessageThreadComponent
        userId={UserOne.senderId}
        messages={chatMessages}
        showMessageDate={args.showMessageDate}
        showMessageStatus={args.showMessageStatus}
        disableJumpToNewMessageButton={!args.enableJumpToNewMessageButton}
        onLoadPreviousChatMessages={onLoadPreviousMessages}
        onRenderMessage={onRenderMessage}
        onFetchAttachments={onFetchAttachment}
        onInlineImageClicked={onInlineImageClicked}
        onUpdateMessage={onUpdateMessageCallback}
        onRenderAvatar={(userId?: string) => {
          return (
            <Persona
              size={PersonaSize.size32}
              hidePersonaDetails
              presence={PersonaPresence.online}
              text={userId}
              imageUrl={GetAvatarUrlByUserId(userId ?? '')}
              showOverflowTooltip={false}
            />
          );
        }}
      />
      {
        <ImageGallery
          isOpen={galleryImages.length > 0}
          images={galleryImages}
          onDismiss={() => setGalleryImages([])}
          onImageDownloadButtonClicked={() => {
            alert('Download button clicked');
          }}
        />
      }
      {/* We need to use the component to render more messages in the chat thread. Using storybook controls would trigger the whole story to do a fresh re-render, not just components inside the story. */}
      <Stack horizontal verticalAlign="end" horizontalAlign="center" tokens={{ childrenGap: '1rem' }}>
        <Dropdown
          style={{ width: '15rem' }}
          label="Send to thread"
          selectedKey={selectedMessageType.key}
          options={dropdownMenuOptions}
          onChange={(_, option) => {
            setSelectedMessageType(option);
          }}
        />
        <PrimaryButton text="Send" onClick={onSendHandler} />
      </Stack>
    </Stack>
  );
};

// This must be the only named export from this module, and must be named to match the storybook path suffix.
// This ensures that storybook hoists the story instead of creating a folder with a single entry.
export const MessageThread = MessageThreadStory.bind({});

export default {
  id: `${COMPONENT_FOLDER_PREFIX}-messagethread`,
  title: `${COMPONENT_FOLDER_PREFIX}/Message Thread`,
  component: MessageThreadComponent,
  argTypes: {
    showMessageDate: controlsToAdd.showMessageDate,
    showMessageStatus: controlsToAdd.showMessageStatus,
    enableJumpToNewMessageButton: controlsToAdd.enableJumpToNewMessageButton,
    // Hiding auto-generated controls
    styles: hiddenControl,
    strings: hiddenControl,
    userId: hiddenControl,
    messages: hiddenControl,
    disableJumpToNewMessageButton: hiddenControl,
    numberOfChatMessagesToReload: hiddenControl,
    onMessageSeen: hiddenControl,
    onRenderMessageStatus: hiddenControl,
    onRenderAvatar: hiddenControl,
    onRenderJumpToNewMessageButton: hiddenControl,
    onLoadPreviousChatMessages: hiddenControl,
    onRenderMessage: hiddenControl,
    onUpdateMessage: hiddenControl,
    onDeleteMessage: hiddenControl,
    disableEditing: hiddenControl
  },
  parameters: {
    docs: {
      container: null,
      page: () => Docs()
    },
    storyshots: { disable: true }
  }
} as Meta;
