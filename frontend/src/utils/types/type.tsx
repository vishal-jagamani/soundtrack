//* Album type
export interface AlbumType {
  albumType: string
  artists: Artist[]
  availableMarkets: string[]
  copyrights: Copyright[]
  externalIds: ExternalIDS
  externalURLs: ExternalUr
  genres: any[]
  href: string
  id: string
  images: Image[]
  label: string
  name: string
  popularity: number
  releaseDate: string
  releaseDatePrecision: string
  totalTracks: number
  tracks: Tracks
  type: string
  uri: string
}

export interface Artist {
  external_urls: ExternalUr
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUr {
  spotify: string
}

export interface Copyright {
  text: string
  type: string
}

export interface ExternalIDS {
  upc: string
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface Tracks {
  href: string
  items: Item[]
  limit: number
  next: null
  offset: number
  previous: null
  total: number
}

export interface Item {
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUr
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: number
  type: ItemType
  uri: string
}

export enum ItemType {
  Track = 'track',
}

//* Artist Type
export interface ArtistType {
  externalURLs: ExternalURLs
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ExternalURLs {
  spotify: string
}

export interface Followers {
  href: null
  total: number
}

export interface Image {
  height: number
  url: string
  width: number
}

//* Track Type
export interface TrackType {
  album: Album
  artists: Artist[]
  discNumber: number
  durationMs: number
  externalURLs: ExternalUr
  href: string
  id: string
  name: string
  popularity: number
  previewURL: null
  trackNumber: number
  type: string
  uri: string
}

export interface Album {
  album_type: string
  artists: Artist[]
  external_urls: ExternalUr
  href: string
  id: string
  images: Image[]
  is_playable: boolean
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface Artist {
  external_urls: ExternalUr
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUr {
  spotify: string
}

export interface Image {
  height: number
  url: string
  width: number
}

//*Small artist type
export interface SmallArtistType {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}
