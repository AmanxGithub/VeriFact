export interface FactCheckResult {
  text: string;
  verdict: 'True' | 'False' | 'Misleading' | 'Unverified' | 'Mixed';
  sources: Source[];
}

export interface Source {
  title: string;
  uri: string;
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}
