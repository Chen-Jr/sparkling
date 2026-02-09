// Copyright 2025 The Sparkling Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import UIKit

extension UIApplication: SPKKitCompatible {}

public extension SPKKitWrapper where Base == UIApplication {
    static var mainWindow: UIWindow? {
        var window: UIWindow? = nil
        window = UIApplication.shared.delegate?.window ?? nil
        if !(window is UIView) {
            window = UIApplication.shared.keyWindow
        }
        if window == nil {
            window = UIApplication.shared.windows.first
        }
        return window
    }
    
}
