import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Cable, ArrowLeft, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface LANSetupPageProps {
  onBack: () => void;
  onConnect: () => void;
}

export function LANSetupPage({ onBack, onConnect }: LANSetupPageProps) {
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "disconnected">("checking");
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Simulate checking for ethernet connection
    const checkConnection = () => {
      setConnectionStatus("checking");
      setTimeout(() => {
        // Randomly simulate connected or disconnected for demo
        const isConnected = Math.random() > 0.3;
        setConnectionStatus(isConnected ? "connected" : "disconnected");
        setIsRetrying(false);
      }, 2000);
    };

    checkConnection();
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    setConnectionStatus("checking");
    setTimeout(() => {
      const isConnected = Math.random() > 0.2;
      setConnectionStatus(isConnected ? "connected" : "disconnected");
      setIsRetrying(false);
    }, 2000);
  };

  const getStatusDisplay = () => {
    switch (connectionStatus) {
      case "checking":
        return {
          icon: <RotateCcw className={`w-12 h-12 text-muted-foreground ${isRetrying ? "animate-spin" : ""}`} />,
          title: "Checking Connection...",
          description: "Please wait while we detect your ethernet cable",
          bgColor: "bg-muted/50",
        };
      case "connected":
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-600" />,
          title: "Cable Connected",
          description: "Ethernet connection detected and ready",
          bgColor: "bg-green-50 dark:bg-green-900/20",
        };
      case "disconnected":
        return {
          icon: <AlertCircle className="w-12 h-12 text-red-600" />,
          title: "Cable Not Detected",
          description: "Please check your ethernet cable connection",
          bgColor: "bg-red-50 dark:bg-red-900/20",
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="mb-12 w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4 p-2"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-foreground">LAN Setup</h1>
          <p className="text-muted-foreground mt-2">Ethernet connection status</p>
        </div>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md bg-card shadow-lg border-border">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-medium text-center">Ethernet Status</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Display */}
          <div className={`rounded-lg p-6 text-center ${statusDisplay.bgColor}`}>
            <div className="flex justify-center mb-4">
              <Cable className="w-16 h-16 text-primary" />
            </div>
            <div className="flex justify-center mb-4">
              {statusDisplay.icon}
            </div>
            <h3 className="text-xl font-medium mb-2">{statusDisplay.title}</h3>
            <p className="text-muted-foreground">{statusDisplay.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {connectionStatus === "connected" && (
              <Button
                className="w-full h-12 bg-primary hover:bg-primary/90"
                onClick={onConnect}
              >
                Proceed
              </Button>
            )}
            
            {connectionStatus === "disconnected" && (
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleRetry}
                disabled={isRetrying}
              >
                <RotateCcw className={`w-4 h-4 mr-2 ${isRetrying ? "animate-spin" : ""}`} />
                Retry Connection
              </Button>
            )}

            {connectionStatus === "checking" && (
              <Button
                variant="outline"
                className="w-full h-12"
                disabled
              >
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}