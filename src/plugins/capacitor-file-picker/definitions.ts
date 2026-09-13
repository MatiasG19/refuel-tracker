import type { PluginListenerHandle } from '@capacitor/core'

export interface FilePickerPlugin {
  /**
   * Get content
   * @param mimeType MIME type
   */
  getContent(options: { mimeType: string }): Promise<void>
  /**
   * Get multiple contents
   * @param mimeType MIME type
   */
  getMultipleConents(options: { mimeType: string }): Promise<void>
  /**
   * Open document tree
   */
  openDocumentTree(): Promise<void>
  /**
   * Open document
   * @param mimeTypes MIME types comma seperated
   */
  openDocument(options: { mimeTypes: string }): Promise<void>
  /**
   * Create document
   * @param mimeType MIME type
   */
  createDocument(options: { mimeType: string }): Promise<void>
  /**
   * Create file
   */
  createFile(options: {
    path: string
    fileName: string
    mimeType: string
    data: string
  }): Promise<void>
  /**
   * Listen for content result from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'getContentResult',
    listener: (res: { path: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Listen for multiple content results from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'getMultipleContentsResult',
    listener: (res: { paths: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Listen for open document tree result from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'openDocumentTreeResult',
    listener: (res: { path: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Listen for open document result from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'openDocumentResult',
    listener: (res: { path: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Listen for create document result from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'createDocumentResult',
    listener: (res: { path: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Remove all listeners.
   */
  removeAllListeners(): Promise<void>
}
