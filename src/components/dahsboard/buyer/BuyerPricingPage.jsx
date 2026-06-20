"use client";

import { Button, Card } from "@heroui/react";

const BuyerPricingPage = ({ user, orderRes, planObj }) => {
  if (!user) {
    return <p className="text-center py-10">Please login first</p>;
  }

  const myOrders = orderRes?.data?.data || [];

  const allPlans = planObj?.data || [];

  const currentOrder = myOrders[0];
  const currentPlanId = currentOrder?.planId;

  const currentPlan = allPlans.find((p) => p.planId === currentPlanId);
  const used = myOrders.length;

  const getRemaining = (plan) => {
    if (!plan) return 0;
    if (plan.max === "unlimited") return "Unlimited";

    return Math.max(plan.max - used, 0);
  };
  
  const upgradePlans = allPlans.filter((p) => p.planId !== currentPlanId);

  const handleCheckout = async (planId) => {
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
    }
  };

  // const isCurrent = plan.planId === currentPlanId;
  // const isFree = plan.planId === "buyer-free";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Pricing & Plans</h1>
        <p className="text-gray-500">
          Manage your subscription and upgrade anytime
        </p>
      </div>

      {/* Current Plan */}
      <Card className="p-5 border border-default-200 space-y-3">
        <h2 className="text-lg font-semibold">Current Plan</h2>

        {currentPlan ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">{currentPlan.planId}</p>

              <p className="text-gray-500">
                Purchases: {used} /{" "}
                {currentPlan.max === "unlimited" ? "∞" : currentPlan.max}
              </p>

              <p className="text-sm text-blue-600">
                Remaining: {getRemaining(currentPlan)}
              </p>
            </div>

            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
              Active
            </span>
          </div>
        ) : (
          <p className="text-gray-500">No active plan</p>
        )}
      </Card>

      {/* Plans */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upgrade Plans</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {allPlans.map((plan) => (
            <Card
              key={plan._id}
              className="p-5 border border-default-200 space-y-3 hover:shadow-lg transition"
            >
              <div>
                <p className="text-lg font-bold">{plan.planId}</p>

                <p className="text-gray-500">Price: ${plan.price}</p>

                <p className="text-gray-500">
                  Limit: {plan.max === "unlimited" ? "Unlimited" : plan.max}
                </p>
              </div>

              <ul className="text-sm text-gray-500 space-y-1">
                <li>✔ Full access</li>
                <li>✔ Priority support</li>
                <li>✔ Cancel anytime</li>
              </ul>

              <Button
                onClick={() => handleCheckout(plan.planId)}
                color={plan.planId === currentPlanId ? "default" : "primary"}
                isDisabled={
                  plan.planId === currentPlanId || plan.planId === "buyer-free"
                }
                className="w-full"
              >
                {plan.planId === currentPlanId || plan.planId === "buyer-free"
                  ? "Current / Free Plan"
                  : "Upgrade Now"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerPricingPage;
