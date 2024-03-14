// Generated by https://quicktype.io

export interface PlaylistType {
  collaborative: boolean
  description: string
  externalURLs: ExternalUr
  id: string
  images: Image[]
  name: string
  owner: Owner
  primaryColor: null
  public: boolean
  snapshotId: string
  tracks: Tracks
  type: string
  uri: string
}

export interface ExternalUr {
  spotify: string
}

export interface Image {
  height: number | null
  url: string
  width: number | null
}

export interface Owner {
  display_name?: string
  external_urls: ExternalUr
  href: string
  id: string
  type: string
  uri: string
  name?: string
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
  added_at: string
  added_by: Owner
  is_local: boolean
  primary_color: null
  track: Track
  video_thumbnail: string
}

export interface Track {
  album: Album
  artists: Owner[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  episode: boolean
  explicit: boolean
  external_ids: string
  external_urls: ExternalUr
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: null | string
  track: boolean
  track_number: number
  type: string
  uri: string
}

export interface Album {
  album_type: string
  artists: Owner[]
  available_markets: string[]
  external_urls: ExternalUr
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}
