import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Wifi, Lock, ArrowLeft, WifiOff } from "lucide-react";
import { useState } from "react";
import { PasswordDialog } from "./PasswordDialog";

interface WiFiNetwork {
  ssid: string;
  signalStrength: number;
  isProtected: boolean;
  isConnected: boolean;
}

interface WiFiSetupPageProps {
  onBack: () => void;
  onConnect: (network: WiFiNetwork, password?: string) => void;
}

const mockNetworks: WiFiNetwork[] = [
  { ssid: "Office_Network_5G", signalStrength: 4, isProtected: true, isConnected: false },
  { ssid: "POS_Systems_WiFi", signalStrength: 3, isProtected: true, isConnected: false },
  { ssid: "Guest_Network", signalStrength: 3, isProtected: false, isConnected: false },
  { ssid: "Backup_Connection", signalStrength: 2, isProtected: true, isConnected: false },
  { ssid: "Mobile_Hotspot", signalStrength: 1, isProtected: true, isConnected: false },
];

export function WiFiSetupPage({ onBack, onConnect }: WiFiSetupPageProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleNetworkSelect = (network: WiFiNetwork) => {
    setSelectedNetwork(network);
    if (network.isProtected) {
      setShowPasswordDialog(true);
    } else {
      onConnect(network);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (selectedNetwork) {
      onConnect(selectedNetwork, password);
    }
    setShowPasswordDialog(false);
  };

  const getSignalIcon = (strength: number) => {
    if (strength >= 4) return <Wifi className="w-5 h-5 text-green-600" />;
    if (strength >= 3) return <Wifi className="w-5 h-5 text-yellow-600" />;
    if (strength >= 2) return <Wifi className="w-5 h-5 text-orange-600" />;
    return <WifiOff className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 p-2"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-semibold text-foreground">Wi-Fi Networks</h1>
        <p className="text-muted-foreground mt-2">Select a network to connect</p>
      </div>

      {/* Networks List */}
      <Card className="flex-1 max-w-2xl mx-auto w-full bg-card shadow-lg border-border">
        <CardHeader>
          <h2 className="text-xl font-medium">Available Networks</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockNetworks.map((network, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-16 flex items-center justify-between p-4 border-2 hover:border-primary hover:bg-accent/50 transition-all duration-200"
              onClick={() => handleNetworkSelect(network)}
            >
              <div className="flex items-center space-x-4">
                {getSignalIcon(network.signalStrength)}
                <div className="text-left">
                  <div className="font-medium text-lg">{network.ssid}</div>
                  <div className="text-sm text-muted-foreground">
                    Signal: {network.signalStrength === 4 ? "Excellent" : 
                             network.signalStrength === 3 ? "Good" :
                             network.signalStrength === 2 ? "Fair" : "Weak"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {network.isProtected && <Lock className="w-4 h-4 text-muted-foreground" />}
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Password Dialog */}
      <PasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onConnect={handlePasswordSubmit}
        networkName={selectedNetwork?.ssid || ""}
      />
    </div>
  );
}