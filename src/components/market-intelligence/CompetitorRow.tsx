
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface CompetitorData {
  id: number;
  name: string;
  domain: string;
  favicon: string;
  monthlyTraffic: number;
  trafficTrend: number[];
  trafficSources: {
    organic: number;
    direct: number;
    referral: number;
    social: number;
    paid: number;
  };
  topKeywords: string[];
  similarityScore: number;
  isExpanded?: boolean;
  isSelected?: boolean;
}

interface CompetitorRowProps {
  competitor: CompetitorData;
  isExpanded: boolean;
  onExpand: () => void;
  formatNumber: (num: number) => string;
}

const CompetitorRow: React.FC<CompetitorRowProps> = ({ 
  competitor, 
  isExpanded, 
  onExpand,
  formatNumber
}) => {
  // Generate sparkline points for traffic trend
  const generateSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const height = 20;
    const width = 80;
    const pointCount = data.length;
    const pointSpacing = width / (pointCount - 1);
    
    const points = data.map((value, index) => {
      const x = index * pointSpacing;
      const normalizedValue = (value - min) / range;
      const y = height - (normalizedValue * height);
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={data[data.length - 1] > data[0] ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <TableRow className={`${competitor.id === 1 ? 'bg-muted/20' : ''}`}>
      <TableCell>
        <div className="flex items-center gap-2">
          <img src={competitor.favicon} alt="" className="h-4 w-4" />
          <div>
            <div className="font-medium">{competitor.name}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              {competitor.domain}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={`https://${competitor.domain}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 inline-flex"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3 text-muted-foreground/70" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit site</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="font-mono font-medium">{formatNumber(competitor.monthlyTraffic)}</span>
      </TableCell>
      <TableCell>
        {generateSparkline(competitor.trafficTrend)}
      </TableCell>
      <TableCell>
        <div className="w-24 h-4 bg-muted/20 rounded-full overflow-hidden flex">
          <div style={{ width: `${competitor.trafficSources.organic}%` }} className="bg-blue-500 h-full"></div>
          <div style={{ width: `${competitor.trafficSources.direct}%` }} className="bg-green-500 h-full"></div>
          <div style={{ width: `${competitor.trafficSources.referral}%` }} className="bg-yellow-500 h-full"></div>
          <div style={{ width: `${competitor.trafficSources.social}%` }} className="bg-purple-500 h-full"></div>
          <div style={{ width: `${competitor.trafficSources.paid}%` }} className="bg-red-500 h-full"></div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {competitor.topKeywords.slice(0, 2).map((keyword, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {competitor.topKeywords.length > 2 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs">
                    +{competitor.topKeywords.length - 2} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    {competitor.topKeywords.slice(2).map((keyword, index) => (
                      <div key={index}>{keyword}</div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-full bg-muted/20 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${competitor.similarityScore}%` }}
            ></div>
          </div>
          <span className="text-xs font-medium">{competitor.similarityScore}%</span>
        </div>
      </TableCell>
      <TableCell>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-8 w-8"
          onClick={onExpand}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CompetitorRow;
