import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Wifi, Cable } from "lucide-react";

interface NetworkSelectionPageProps {
  onSelectWifi: () => void;
  onSelectLAN: () => void;
}

export function NetworkSelectionPage({ onSelectWifi, onSelectLAN }: NetworkSelectionPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-primary mb-2">SIMPAL POS System</h1>
        </div>
        <h2 className="text-3xl font-semibold text-foreground">Network Setup</h2>
        <p className="text-muted-foreground mt-2">Choose your connection method</p>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md bg-card shadow-lg border-border">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-medium text-center">Connection Options</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Wi-Fi Option */}
          <Button
            variant="outline"
            className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-2 hover:border-primary hover:bg-accent/50 transition-all duration-200"
            onClick={onSelectWifi}
          >
            <Wifi className="w-8 h-8 text-primary" />
            <span className="text-lg font-medium">Wi-Fi Setup</span>
          </Button>

          {/* LAN Option */}
          <Button
            variant="outline"
            className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-2 hover:border-primary hover:bg-accent/50 transition-all duration-200"
            onClick={onSelectLAN}
          >
            <Cable className="w-8 h-8 text-primary" />
            <span className="text-lg font-medium">LAN (Ethernet) Setup</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}