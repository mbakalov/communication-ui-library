// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Icon, IconButton, Spinner, SpinnerSize, TooltipHost } from '@fluentui/react';
import React, { useCallback, useState } from 'react';
import { useMemo } from 'react';
/* @conditional-compile-remove(file-sharing) */
import { useLocale } from '../localization';
import { _FileCard } from './FileCard';
import { _FileCardGroup } from './FileCardGroup';
import { iconButtonClassName } from './styles/IconButton.styles';
import { _formatString } from '@internal/acs-ui-common';

/* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
/**
 * @beta
 */
export type FileMetadataAttachmentType =
  | 'fileSharing'
  | /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */ 'inlineImage'
  | 'unknown';

/**
 * Base interface that all Meta Data should extend.
 * Typically used for ACS to ACS file transfers.
 * @beta
 */
export interface BaseFileMetadata {
  /**
   * File name to be displayed.
   */
  name: string;
  /**
   * Extension is used for rendering the file icon.
   * An unknown extension will be rendered as a generic icon.
   * Example: `jpeg`
   */
  extension: string;
  /**
   * Download URL for the file.
   */
  url: string;
  /**
   * Unique ID of the file.
   */
  /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
  id: string;
  /**
   * Attachment Type
   */
  /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
  attachmentType: FileMetadataAttachmentType;
}
/**
 * Meta Data containing basic information about the uploaded file.
 * Typically used for ACS to ACS file transfers.
 * @beta
 */
export interface FileSharingMetadata extends BaseFileMetadata {
  /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
  attachmentType: 'fileSharing';
  /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
  /*
   * Optional dictionary of meta data asscoiated with the file.
   */
  payload?: Record<string, string>;
}

/* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
/**
 * Meta Data containing data for images.
 * @beta
 */
export interface ImageFileMetadata extends BaseFileMetadata {
  /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
  /*
   * Attachment type of the file.
   * Possible values {@link FileDownloadHandler}.
   */
  attachmentType: 'inlineImage';
  /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
  /*
   * Preview URL for the file.
   * Used in the message bubble for inline images.
   */
  previewUrl?: string;
}

/**
 * Meta Data containing information about the uploaded file.
 * @beta
 */
export type FileMetadata =
  | FileSharingMetadata
  | /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */ ImageFileMetadata;

/* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
/**
 * @beta
 */
export interface AttachmentDownloadResult {
  blobUrl: string;
}

/**
 * Strings of _FileDownloadCards that can be overridden.
 *
 * @internal
 */
export interface _FileDownloadCardsStrings {
  /** Aria label to notify user when focus is on file download button. */
  downloadFile: string;
  fileCardGroupMessage: string;
}

/**
 * @beta
 * A file download error returned via a {@link FileDownloadHandler}.
 * This error message is used to render an error message in the UI.
 */
export interface FileDownloadError {
  /** The error message to display in the UI */
  errorMessage: string;
}

/**
 * @beta
 *
 * A callback function for handling file downloads.
 * The function needs to return a promise that resolves to a file download URL.
 * If the promise is rejected, the {@link Error.message} will be used to display an error message to the user.
 *
 * @example
 * ```ts
 * const fileDownloadHandler: FileDownloadHandler = async (userId, fileData) => {
 *   if (isUnauthorizedUser(userId)) {
 *     return { errorMessage: 'You don’t have permission to download this file.' };
 *   } else {
 *     return new URL(fileData.url);
 *   }
 * }
 *
 * const App = () => (
 *   <ChatComposite
 *     ...
 *     fileSharing={{
 *       fileDownloadHandler: fileDownloadHandler
 *     }}
 *   />
 * )
 *
 * ```
 * @param userId - The user ID of the user downloading the file.
 * @param fileMetadata - The {@link FileMetadata} containing file `url`, `extension` and `name`.
 */
export type FileDownloadHandler = (userId: string, fileMetadata: FileMetadata) => Promise<URL | FileDownloadError>;

/**
 * @internal
 */
export interface _FileDownloadCards {
  /**
   * User id of the local participant
   */
  userId: string;
  /**
   * A chat message metadata that inculdes file metadata
   */
  fileMetadata: FileMetadata[];
  /**
   * A function of type {@link FileDownloadHandler} for handling file downloads.
   * If the function is not specified, the file's `url` will be opened in a new tab to
   * initiate the download.
   */
  downloadHandler?: FileDownloadHandler;
  /**
   * Optional callback that runs if downloadHandler returns {@link FileDownloadError}.
   */
  onDownloadErrorMessage?: (errMsg: string) => void;
  /**
   * Optional arialabel strings for file download cards
   */
  strings?: _FileDownloadCardsStrings;
}

const fileDownloadCardsStyle = {
  marginTop: '0.25rem'
};

const actionIconStyle = { height: '1rem' };

/**
 * @internal
 */
export const _FileDownloadCards = (props: _FileDownloadCards): JSX.Element => {
  const { userId, fileMetadata } = props;
  const [showSpinner, setShowSpinner] = useState(false);
  const localeStrings = useLocaleStringsTrampoline();

  const downloadFileButtonString = useMemo(
    () => () => {
      return props.strings?.downloadFile ?? localeStrings.downloadFile;
    },
    [props.strings?.downloadFile, localeStrings.downloadFile]
  );

  const isFileSharingAttachment = useCallback((attachment: FileMetadata): boolean => {
    /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
    return attachment.attachmentType === 'fileSharing';
    return false;
  }, []);

  /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
  const isShowDownloadIcon = useCallback((attachment: FileMetadata): boolean => {
    /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
    return attachment.attachmentType === 'fileSharing' && attachment.payload?.teamsFileAttachment !== 'true';
    return true;
  }, []);

  const fileCardGroupDescription = useMemo(
    () => () => {
      const fileGroupLocaleString = props.strings?.fileCardGroupMessage ?? localeStrings.fileCardGroupMessage;
      /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
      return _formatString(fileGroupLocaleString, {
        fileCount: `${fileMetadata.filter(isFileSharingAttachment).length}`
      });
      return _formatString(fileGroupLocaleString, {
        fileCount: `${fileMetadata.length}`
      });
    },
    [props.strings?.fileCardGroupMessage, localeStrings.fileCardGroupMessage, fileMetadata, isFileSharingAttachment]
  );

  const fileDownloadHandler = useCallback(
    async (userId, file: FileMetadata) => {
      if (!props.downloadHandler) {
        window.open(file.url, '_blank', 'noopener,noreferrer');
      } else {
        setShowSpinner(true);
        try {
          const response = await props.downloadHandler(userId, file);
          setShowSpinner(false);
          if (response instanceof URL) {
            window.open(response.toString(), '_blank', 'noopener,noreferrer');
          } else {
            props.onDownloadErrorMessage && props.onDownloadErrorMessage(response.errorMessage);
          }
        } finally {
          setShowSpinner(false);
        }
      }
    },
    [props]
  );
  if (
    !fileMetadata ||
    fileMetadata.length === 0 ||
    /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */ !fileMetadata.some(isFileSharingAttachment)
  ) {
    return <></>;
  }

  return (
    <div style={fileDownloadCardsStyle} data-ui-id="file-download-card-group">
      <_FileCardGroup ariaLabel={fileCardGroupDescription()}>
        {fileMetadata &&
          fileMetadata
            .filter((attachment) => {
              /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
              return isFileSharingAttachment(attachment);
              return true;
            })
            .map((file) => (
              <TooltipHost content={downloadFileButtonString()} key={file.name}>
                <_FileCard
                  fileName={file.name}
                  key={file.name}
                  fileExtension={file.extension}
                  actionIcon={
                    showSpinner ? (
                      <Spinner size={SpinnerSize.medium} aria-live={'polite'} role={'status'} />
                    ) : true &&
                      /* @conditional-compile-remove(teams-inline-images-and-file-sharing) */
                      isShowDownloadIcon(file) ? (
                      <IconButton className={iconButtonClassName} ariaLabel={downloadFileButtonString()}>
                        <DownloadIconTrampoline />
                      </IconButton>
                    ) : undefined
                  }
                  actionHandler={() => fileDownloadHandler(userId, file)}
                />
              </TooltipHost>
            ))}
      </_FileCardGroup>
    </div>
  );
};

/**
 * @private
 */
const DownloadIconTrampoline = (): JSX.Element => {
  // @conditional-compile-remove(file-sharing)
  return <Icon data-ui-id="file-download-card-download-icon" iconName="DownloadFile" style={actionIconStyle} />;
  // Return _some_ available icon, as the real icon is beta-only.
  return <Icon iconName="EditBoxCancel" style={actionIconStyle} />;
};

const useLocaleStringsTrampoline = (): _FileDownloadCardsStrings => {
  /* @conditional-compile-remove(file-sharing) @conditional-compile-remove(teams-inline-images-and-file-sharing)*/
  return useLocale().strings.messageThread;
  return { downloadFile: '', fileCardGroupMessage: '' };
};
